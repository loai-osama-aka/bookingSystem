import { model, Schema } from "mongoose";

const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
  },
  { timestamp: true },
);

export const userModel = model("user", userSchema);
