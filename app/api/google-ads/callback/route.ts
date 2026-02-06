import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/mongoDB";
import User from "@/app/models/user";
import fetchData from "@/app/lib/fetchDataForEachCustomer";
import CampaignMetrics from "@/app/models/campaign_metrics";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Missing authorization code" },
        { status: 400 },
      );
    }

    /* 1️⃣ Exchange code for tokens */
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_ADS_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    const { access_token, refresh_token } = tokenData;
    console.log(access_token, " ", refresh_token);

    if (!access_token) {
      throw new Error("No access token received");
    }

    /* 2️⃣ Fetch accessible customers */
    const response = await fetch(
      "https://googleads.googleapis.com/v23/customers:listAccessibleCustomers",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": process.env.DEVELOPER_TOKEN!,
        },
      },
    );

    const parsedData = await response.json();

    if (!parsedData.resourceNames?.length) {
      throw new Error("No accessible customers found");
    }

    const customerIds = parsedData.resourceNames.map(
      (name: string) => name.split("/")[1],
    );
    console.log(customerIds);

    /* 3️⃣ Fetch campaign data for ALL customers */
    const resultsPerCustomer = await Promise.all(
      customerIds.map((id: string) => fetchData(id, access_token)),
    );

    const allResults = resultsPerCustomer.flatMap(
      (res: any) => res.results || [],
    );

    /* 4️⃣ Save campaign metrics */
    const reportDate = new Date("2026-02-05");
    console.log(allResults);

    await connectMongoDB();

    const bulkOps = allResults.map((row: any) => ({
      updateOne: {
        filter: {
          customerId: row.customer.id,
          "campaign.id": row.campaign.id,
          date: reportDate,
        },
        update: {
          $set: {
            customerId: row.customer.id,
            campaign: {
              resourceName: row.campaign.resourceName,
              id: row.campaign.id,
              name: row.campaign.name,
              status: row.campaign.status,
            },
            metrics: {
              impressions: Number(row.metrics.impressions),
              clicks: Number(row.metrics.clicks),
              conversions: Number(row.metrics.conversions),
              conversionsValue: Number(row.metrics.conversionsValue),
              costMicros: Number(row.metrics.costMicros),
            },
            source: "google_ads",
            date: reportDate,
          },
        },
        upsert: true,
      },
    }));

    if (bulkOps.length) {
      await CampaignMetrics.bulkWrite(bulkOps);
    }

    /* 5️⃣ Store refresh token (FIRST TIME ONLY) */
    if (refresh_token) {
      await User.findOneAndUpdate(
        { role: "admin" },
        { googleAdsRefreshToken: refresh_token },
      );
    }

    /* 6️⃣ Redirect success */
    return NextResponse.redirect(new URL("/dashboard?connected=1", req.url));
  } catch (error: any) {
    console.error("Google Ads Callback Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
