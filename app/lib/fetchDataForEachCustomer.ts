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
          campaign.name, 
          campaign.id, 
          customer.descriptive_name, 
          customer.id, 
          campaign.status 
          FROM campaign 
          WHERE 
          segments.date DURING YESTERDAY 
          AND campaign.status != 'UNKNOWN' 
          ORDER BY 
          campaign.name ASC`,
      }),
    },
  );

  if (!adsRes.ok) {
    const errorDetails = await adsRes.json();
    console.log("GOOGLE ADS ERROR:", JSON.stringify(errorDetails, null, 2));
    return adsRes;
  } else {
    const fetchedData = await adsRes.json();
    return fetchedData;
  }
}
