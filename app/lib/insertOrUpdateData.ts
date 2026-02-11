import CampaignMetrics from "../models/campaign_metrics";
import fetchData from "./fetchDataForEachCustomer";
import connectMongoDB from "./mongoDB";

export const insertOrUpdateData = async (
  customerIds: string[],
  access_token: string,
) => {
  const resultsPerCustomer = await Promise.all(
    customerIds.map((id: string) => fetchData(id, access_token)),
  );

  const allRows = resultsPerCustomer
    .flat()
    .flatMap((batch: any) => batch.results || []);
  await connectMongoDB();

  const bulkOps = allRows.map((row: any) => ({
    updateOne: {
      filter: {
        "customer.id": row.customer.id,
        "campaign.id": row.campaign.id,
      },
      update: {
        $set: {
          customer: {
            id: row.customer.id,
            name: row.customer.descriptiveName,
          },
          campaign: {
            id: row.campaign.id,
            name: row.campaign.name,
            status: row.campaign.status,
          },
          metrics: {
            impressions: Number(row.metrics.impressions || 0),
            clicks: Number(row.metrics.clicks || 0),
            conversions: Number(row.metrics.conversions || 0),
            conversionsValue: Number(row.metrics.conversionsValue || 0),
            costMicros: Number(row.metrics.costMicros || 0),
          },
          source: "google_ads",
        },
      },
      upsert: true,
    },
  }));

  if (bulkOps.length > 0) {
    await CampaignMetrics.bulkWrite(bulkOps);
  }
};
