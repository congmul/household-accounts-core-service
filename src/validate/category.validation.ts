import JoiBase from "joi";
import JoiDate from "@joi/date";
import { validObjectId } from "./validate.middleware";

const Joi = JoiBase.extend(JoiDate);

export const validCategory = {
  body: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
    name: Joi.string().required(),
    type: Joi.string().valid("income", "expense", "investment").required(),
    icon: Joi.string(),
    color: Joi.string(),
  }),
};
export const validSubCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(validObjectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    icon: Joi.string(),
    color: Joi.string(),
  }),
};
export const validGetCategory = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
  }),
  query: Joi.object().keys({
    type: Joi.string().valid("expense", "income", "investment").required(),
  }),
};
export const validParamsCategoryId = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(validObjectId).required(),
  }),
};
export const validUpdateCategory = {
  ...validParamsCategoryId,
  body: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    icon: Joi.string(),
    color: Joi.string(),
  }),
};
