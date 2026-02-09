import mongoose, { Schema } from "mongoose";

interface Customer {
  id: string;
  name: string;
}

const Campaign_Customer_Schema = new Schema({
  id: { type: String, requird: true },
  name: { type: String, required: true },
});

const Customer = mongoose.model("Customer", Campaign_Customer_Schema);
export default Customer;
