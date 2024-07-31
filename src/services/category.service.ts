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
};
