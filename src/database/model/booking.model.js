import { model, Schema, Types } from "mongoose";

const bookingSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
  },
  status: {
    type: String,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
});

export const bookingModel = model("booking", bookingSchema);
{
}
