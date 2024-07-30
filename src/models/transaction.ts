import { model, Schema } from "mongoose";
import { ITransaction, ITransactionType } from "../types";

const transactionSchema = new Schema<ITransaction>({
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
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  note: {
    type: String,
  },
  paymentMethod: {
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

transactionSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: Date.now });
});

const Transaction = model("Transaction", transactionSchema);
export default Transaction;
