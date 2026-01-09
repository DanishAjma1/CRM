import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/app/lib/mongoDB";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, password } = await req.json();
    if (await User.findOne({ email: new Object(email) })) {
      return new Response({ message: "Email already exist" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    return new Response(
      { message: "Data inserted successfully." },
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    });
  }
}
