import { Category } from "../models";
import logger from "../utils/logger";
import { ErrorMsg } from "../config/msgs";
import { ICategoryCreatePayload, ICategoryUpdatePayload } from "../types";
import AppError from "../utils/errorHandler";

export const categoryService = {
  createCategory: async (payload: ICategoryCreatePayload) => {
    try {
      const result = await Category.create(payload);
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.createDbError("category").message, 500);
    }
  },
  getCategories: async (userId: string) => {
    try {
      const result = await Category.find({ userId });
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("category").message, 500);
    }
  },
  getCategory: async (categoryId: string) => {
    try {
      const result = await Category.findOne({ _id: categoryId });
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("category").message, 500);
    }
  },
  updateCategory: async (
    categoryId: string,
    payload: ICategoryUpdatePayload,
  ) => {
    try {
      const result = await Category.findByIdAndUpdate(
        { _id: categoryId },
        { ...payload },
      );
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("category").message, 500);
    }
  },
  deleteCategory: async (categoryId: string) => {
    try {
      const result = await Category.findByIdAndDelete({ _id: categoryId });
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("category").message, 500);
    }
  },
};
