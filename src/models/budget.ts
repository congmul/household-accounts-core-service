import { model, Schema } from "mongoose";
import { IBudget } from "../types";

const budgetSchema = new Schema<IBudget>({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  accountBookId: {
    type: Schema.Types.ObjectId,
    ref: "AccountBook",
    index: true,
  },
  date: {
    type: Date,
    required: true,
    set: (value: Date | string) => {
      // Ensure value is a Date object
      const date = new Date(value);
      // Set date to the first day of the month
      date.setUTCDate(1);
      // Set time to 00:00:00
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
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

budgetSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: Date.now() });
});

const Budget = model("Budget", budgetSchema);
export default Budget;
