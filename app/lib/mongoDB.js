import mongoose from "mongoose";
const { MONGODB_URI } = process.env;
export default async function connectMongoDB() {
  try {
    if (MONGODB_URI === undefined) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }
    console.log("Connecting to MongoDB...");
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
