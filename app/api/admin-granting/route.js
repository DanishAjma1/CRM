import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongoDB";
import CampaignMetrics from "../../models/campaign_metrics";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log("Received request for client_id:", id);
    await connectMongoDB();
    const customers = await CampaignMetrics.find({ client_id: id });
    if (!customers || customers.length === 0) {
      console.log("No campaign metrics found for client_id:", id);
      return new NextResponse(
        JSON.stringify({ error: "No campaign metrics found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return new NextResponse(JSON.stringify(customers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching campaign metrics:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
