import { model, Schema } from "mongoose";
import { IAccountBook } from "../types";

const accountBookSchema = new Schema<IAccountBook>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const AccountBook = model("AccountBook", accountBookSchema);
export default AccountBook;
