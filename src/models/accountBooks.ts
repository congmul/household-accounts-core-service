import { model, Schema } from "mongoose";
import { IAccountBook } from "../types";

const accountBookSchema = new Schema<IAccountBook>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userList: [
    {
      userId: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["owner", "editor", "viewer"],
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

accountBookSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: Date.now() });
});

const AccountBook = model("AccountBook", accountBookSchema);
export default AccountBook;
