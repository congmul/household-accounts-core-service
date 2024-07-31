import { Category } from "../models";
import logger from "../utils/logger";
import { CategoryMgs } from "../config/msgs";
import { ICategoryCreatePayload } from "../types";

export const categoryService = {
  createCategory: async (payload: ICategoryCreatePayload) => {
    try {
      const result = await Category.create(payload);
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error(CategoryMgs.createDbError.message);
    }
  },
  getCategories: async (userId: string) => {
    try {
      const result = await Category.find({ userId });
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error(CategoryMgs.getDbError.message);
    }
  },
  getCategory: async (categoryId: string) => {
    try {
      const result = await Category.findOne({ _id: categoryId });
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error(CategoryMgs.getDbError.message);
    }
  },
  deleteCategory: async (categoryId: string) => {
    try {
      const result = await Category.findByIdAndDelete({ _id: categoryId });
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error(CategoryMgs.deleteDbError.message);
    }
  },
};
