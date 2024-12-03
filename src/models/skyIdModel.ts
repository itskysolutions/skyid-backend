import { model, Schema, Types } from "mongoose";
import type { ISkyId } from "../types";

const skyIdSchema = new Schema<ISkyId>(
  {
    skyId: { type: String, required: true, unique: true },
    mappedNumbers: [String],
    withIVR: Boolean,
    withIVM: Boolean,
    userId: Types.ObjectId,
    status: {
      type: String,
      required: true,
      enum: ["pending", "active", "inactive"],
    },
    amount: Number,
    txnRef: String,
  },
  { timestamps: true },
);

const SkyId = model("skyId", skyIdSchema);

export default SkyId;
