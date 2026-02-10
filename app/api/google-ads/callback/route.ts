import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/mongoDB";
import User from "@/app/models/user";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code" }, { status: 400 });
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

  const data = await tokenRes.json();
  console.log("Google OAuth Token Response:", data);
  
  if (!data.refresh_token) {
    return NextResponse.json(
      { error: "No refresh token returned" },
      { status: 400 }
    );
  }

  try {
  await connectMongoDB();
  await User.findOneAndUpdate(
    { role: "admin" },
    { refresh_token: data.refresh_token }
  );

  return NextResponse.redirect("http://localhost:3000/dashboard?connected=1");
  } catch (error) {
    console.error("Error saving refresh token:", error);
    return NextResponse.json(
      { error: "Failed to save refresh token" },
      { status: 500 }
    );
  }
}
