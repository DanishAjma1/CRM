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

    const uniqueCustomerIds = customerIds.filter(
      (id: string) => id !== process.env.MCC_ID,
    );
    console.log(customerIds);
    console.log(uniqueCustomerIds);

    /* 3️⃣ Fetch campaign data for ALL customers */
    const resultsPerCustomer = await Promise.all(
      uniqueCustomerIds.map((id: string) => fetchData(id, access_token)),
    );

    /* 4️⃣ Save campaign metrics */
    const reportDate = new Date("2026-02-05");
    console.log("All results:", resultsPerCustomer);
    const allRows = resultsPerCustomer
      .flat()
      .flatMap((batch: any) => batch.results || []);
    console.log("All rows:", allRows);

    await connectMongoDB();

    const bulkOps = allRows.map((row: any) => ({
      updateOne: {
        filter: {
          "customer.id": row.customer.id,
          "campaign.id": row.campaign.id,
          date: reportDate,
        },
        update: {
          $set: {
            "customer.id": row.customer.id,
            campaign: {
              resourceName: row.campaign.resourceName,
              id: row.campaign.id,
              name: row.campaign.name,
              status: row.campaign.status,
            },
            metrics: {
              // Google Ads API returns metrics as strings; convert to numbers
              impressions: Number(row.metrics.impressions || 0),
              clicks: Number(row.metrics.clicks || 0),
              conversions: Number(row.metrics.conversions || 0),
              conversionsValue: Number(row.metrics.conversionsValue || 0),
              // cost_micros needs to be handled carefully (divide by 1,000,000 for actual currency)
              costMicros: Number(row.metrics.costMicros || 0),
            },
            source: "google_ads",
            date: reportDate,
          },
        },
        upsert: true,
      },
    }));

    if (bulkOps.length > 0) {
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
