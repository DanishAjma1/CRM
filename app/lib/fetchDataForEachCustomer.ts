import axios from "axios";
import { NextResponse } from "next/server";

export default async function fetchData(
  client_id: string,
  access_token: string,
) {
  const adsRes = await fetch(
    `https://googleads.googleapis.com/v23/customers/${client_id}/googleAds:searchStream`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "developer-token": process.env.DEVELOPER_TOKEN!,
        "login-customer-id": process.env.MCC_ID!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          SELECT 
          metrics.impressions, 
          metrics.clicks, 
          metrics.conversions, 
          metrics.conversions_value, 
          metrics.cost_micros, 
          campaign.status, 
          campaign.name, 
          campaign.id, 
          customer.descriptive_name, 
          customer.id 
          FROM campaign 
          WHERE 
          segments.date DURING LAST_7_DAYS 
          AND campaign.status != 'REMOVED' 
          ORDER BY 
          campaign.name ASC   `,
      }),
    },
  );

  if (!adsRes.ok) {
    try {
      return NextResponse.json(
        { error: "Failed to fetch ads data" },
        { status: adsRes.status },
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    return adsRes.json();
  }
}
