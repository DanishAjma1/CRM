import { getAccessToken } from "@/app/lib/fetchAccessToken";
import { fetchClients } from "@/app/lib/fetchAllClients";
import { insertOrUpdateData } from "@/app/lib/insertOrUpdateData";
import connectMongoDB from "@/app/lib/mongoDB";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  console.log(authHeader);
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectMongoDB();
    const user = await User.findOne({ role: "admin" });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: "User not found to get the refresh token" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }
    const access_token = await getAccessToken(user.refresh_token);

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

    // return NextResponse.redirect(new URL("/"));
    return new NextResponse(JSON.stringify(customerIds), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
