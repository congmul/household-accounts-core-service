import { model, Schema } from "mongoose";
import { ICategory } from "../types";

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
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

const categorySchema = new Schema<ICategory>({
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
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String, // income or expense
    required: true,
  },
  icon: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  subcategories: [subcategorySchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

categorySchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: Date.now() });
});

const Category = model("Category", categorySchema);
export default Category;
