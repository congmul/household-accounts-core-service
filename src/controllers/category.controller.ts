import { Request, Response } from "express";
import { SuccessMsg, ErrorMsg } from "../config/msgs";
import { categoryService, userService } from "../services";
import logger from "../utils/logger";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }

    await categoryService.createCategory(req.body);

    res.status(201).send(SuccessMsg.create("category"));
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }
    const result = await categoryService.getCategories(userId);

    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    // Check if the category exists
    const category = await categoryService.getCategory(categoryId);
    if (!category) {
      return res
        .status(404)
        .send({ ...ErrorMsg.notFound("Category"), categoryId });
    }
    await categoryService.updateCategory(categoryId, req.body);
    res.status(200).send(SuccessMsg.update("Category"));
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    // Check if the category exists
    const category = await categoryService.getCategory(categoryId);
    if (!category) {
      return res
        .status(404)
        .send({ ...ErrorMsg.notFound("Category"), categoryId });
    }
    await categoryService.deleteCategory(categoryId);
    res.status(200).send(SuccessMsg.delete("Category"));
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};
