import { Request, Response } from "express";
import { CategoryMgs, ErrorMsg } from "../config/msgs";
import { categoryService, userService } from "../services";
import logger from "../utils/logger";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const isUser = userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ message: "User not found" });
    }

    await categoryService.createCategory(req.body);

    res.status(201).send(CategoryMgs.create);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(ErrorMsg.exceptionError);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ message: "User not found" });
    }
    const result = await categoryService.getCategories(userId);

    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(ErrorMsg.exceptionError);
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    // Check if the category exists
    const category = await categoryService.getCategory(categoryId);
    if (!category) {
      return res.status(404).send({ ...CategoryMgs.notFound, categoryId });
    }
    await categoryService.deleteCategory(categoryId);
    res.status(200).send(CategoryMgs.delete);
  } catch (err) {
    logger.error(err);
    res.status(500).send(ErrorMsg.exceptionError);
  }
};
