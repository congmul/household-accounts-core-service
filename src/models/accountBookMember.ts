import { model, Schema } from "mongoose";
import { IAccountBookMember } from "../types";

const AccountBookMemberSchema = new Schema<IAccountBookMember>(
  {
    accountBookId: {
      type: Schema.Types.ObjectId,
      ref: "AccountBook",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["owner", "editor", "viewer"],
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Prevent duplicate membership for same (userId, accountBookId)
AccountBookMemberSchema.index(
  { userId: 1, accountBookId: 1 },
  { unique: true },
);

// Enforce: only one default per user (across all account books)
AccountBookMemberSchema.index(
  { userId: 1, isDefault: 1 },
  { unique: true, partialFilterExpression: { isDefault: true } },
);

const AccountBookMember = model("AccountBookMember", AccountBookMemberSchema);
export default AccountBookMember;
