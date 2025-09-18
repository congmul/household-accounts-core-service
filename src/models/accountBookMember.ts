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
      default: true,
    },
  },
  { timestamps: true },
);

AccountBookMemberSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("isDefault") || this.isDefault !== true) return next();
    await this.model("AccountBookMember").updateMany(
      { userId: this.userId, isDefault: true, _id: { $ne: this._id } },
      { $set: { isDefault: false } },
    );
    return next();
  } catch (err) {
    return next();
  }
});

AccountBookMemberSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as any;
  const $set = update?.$set ?? update ?? {};

  if (update.isDefault === true) {
    const query = this.getQuery();
    const userId = query.userId ?? $set.userId;

    if (userId) {
      await this.model.updateMany(
        { userId, isDefault: true, _id: { $ne: query._id } },
        { $set: { isDefault: false } },
      );
    }
  }
  next();
});

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
