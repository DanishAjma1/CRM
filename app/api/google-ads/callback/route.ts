import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/mongoDB";
import User from "@/app/models/user";
import fetchData from "@/app/lib/fetchDataForEachCustomer";
import CampaignMetrics from "@/app/models/campaign_metrics";
import { fetchClients } from "@/app/lib/fetchAllClients";
import { insertOrUpdateData } from "@/app/lib/insertOrUpdateData";

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

    if (!access_token) {
      throw new Error("No access token received");
    }

    const customerIds = await fetchClients(access_token);

    if (!customerIds || !Array.isArray(customerIds)) {
      return NextResponse.json(
        { error: "Error while fetching customers" },
        { status: 400 },
      );
    } else {
      await insertOrUpdateData(customerIds, access_token);
    }

    if (refresh_token) {
      await User.findOneAndUpdate(
        { role: "admin" },
        { refresh_token: refresh_token },
      );
    }

    return NextResponse.redirect("/dashboard");
  } catch (error: any) {
    console.error("Google Ads Callback Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
