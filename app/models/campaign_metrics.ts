import mongoose, { Schema, Document, model, models } from "mongoose";

export interface CampaignMetricsDocument extends Document {
  customer: {
    id: string;
    name: string;
  };

  campaign: {
    resourceName: string;
    id: string;
    name: string;
    status: "ENABLED" | "PAUSED" | "REMOVED";
  };

  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    conversionsValue: number;
    costMicros: number;
  };

  date: Date; // represents the reporting date (e.g. yesterday)
  source: "google_ads";

  updatedAt: Date;
}

const CampaignMetricsSchema = new Schema(
  {
    customer: {
      id: {
        type: String,
        required: true,
        index: true,
      },
      name: {
        type: String,
        required: true,
        index: true,
      },
    },

    campaign: {
      resourceName: { type: String, required: true },
      id: { type: String, required: true, index: true },
      name: { type: String, required: true },
      status: {
        type: String,
        enum: ["ENABLED", "PAUSED", "REMOVED"],
        required: true,
      },
    },

    metrics: {
      impressions: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      conversions: { type: Number, default: 0 },
      conversionsValue: { type: Number, default: 0 },
      costMicros: { type: Number, default: 0 },
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    source: {
      type: String,
      default: "google_ads",
    },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Prevent duplicate inserts for same campaign + date
CampaignMetricsSchema.index(
  { customerId: 1, "campaign.id": 1, date: 1 },
  { unique: true },
);

const CampaignMetrics =
  models.CampaignMetrics || model("CampaignMetrics", CampaignMetricsSchema);
export default CampaignMetrics;
