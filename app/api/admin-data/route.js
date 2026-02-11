import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongoDB";
import CampaignMetrics from "../../models/campaign_metrics";
import User from "@/app/models/user";

export async function GET(req) {
  try {
    await connectMongoDB();
    const customers = await CampaignMetrics.find();

    const users = await User.find({ role: "user" });
    if (!customers || customers.length === 0) {
      console.log("No campaign metrics found");
      return new NextResponse(
        JSON.stringify({ error: "No campaign metrics found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return new NextResponse(JSON.stringify({ customers, users }), {
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

export async function POST(req) {
  try {
    console.log(req);
    const { customerId, userId } = await req.json();
    await connectMongoDB();
    await CampaignMetrics.updateMany(
      { "customer.id": customerId },
      { $set: { client_id: userId } },
    );

    const customers = await CampaignMetrics.find();
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
