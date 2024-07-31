import { model, Schema } from "mongoose";
import { IAssets } from "../types";

const assetsSchema = new Schema<IAssets>({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    set: (value: Date | string) => {
      // Ensure value is a Date object
      const date = new Date(value);
      // Set time to 00:00:00
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

assetsSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: Date.now() });
});

const Assets = model("Assets", assetsSchema);
export default Assets;
