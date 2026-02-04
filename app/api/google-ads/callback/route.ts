import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/mongoDB";
import User from "@/app/models/user";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  // 1. Exchange Code for Tokens
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

  // 2. Fetch Ads Data using SearchStream
  const query = `
    SELECT 
      campaign.id, 
      campaign.name, 
      metrics.clicks, 
      metrics.impressions, 
      metrics.cost_micros,
      segments.date 
    FROM campaign 
    WHERE segments.date DURING TODAY`;

    console.log(process.env.DEVELOPER_TOKEN, " ", process.env.GOOGLE_ADS_CUSTOMER_ID," ",);
  const adsRes = await fetch(
    `https://googleads.googleapis.com/v23/customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/googleAds:searchStream`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "developer-token": process.env.DEVELOPER_TOKEN!,
        "login-customer-id": "1155935025", // Your MCC ID (no hyphens)
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  console.log(adsRes.status);
  if (!adsRes.ok) {
    const errorBody = await adsRes.text();
    console.error("Google Ads API Error:", errorBody);
    return NextResponse.json({ error: "Failed to fetch ads data", details: errorBody }, { status: adsRes.status });
  }

  const streamData = await adsRes.json();
  console.log("Success! Data received:", JSON.stringify(streamData, null, 2));

  // 4. Update Database
  // Note: refresh_token is only returned on the FIRST consent.
  if (refresh_token) {
    await connectMongoDB();
    await User.findOneAndUpdate(
      { role: "admin" },
      { googleAdsRefreshToken: refresh_token },
      { upsert: true }
    );
  }

  return NextResponse.redirect(new URL("/authentication/admin", req.url));
}
