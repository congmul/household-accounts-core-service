import JoiBase from "joi";
import JoiDate from "@joi/date";
import { validObjectId } from "./validate.middleware";

const Joi = JoiBase.extend(JoiDate);

export const validBudget = {
  body: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
    date: Joi.date().format("YYYY-MM-DD").required(),
    amount: Joi.number().required(),
    category: Joi.string().required(),
  }),
};

export const validGetBudget = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
  }),
  query: Joi.object().keys({
    year: Joi.string()
      .pattern(/^\d{4}$/)
      .required(),
    month: Joi.string()
      .custom((value: string, helpers: any) => {
        const month = parseInt(value);
        if (month < 1 || month > 12) {
          return helpers.message("Month must be between 1 and 12");
        }
        return value;
      })
      .required(),
  }),
};

export const validUpdateBudget = {
  params: Joi.object().keys({
    budgetId: Joi.string().custom(validObjectId).required(),
  }),
  body: Joi.object().keys({
    amount: Joi.number(),
    category: Joi.string(),
  }),
};
export const validDeleteBudget = {
  params: Joi.object().keys({
    budgetId: Joi.string().custom(validObjectId).required(),
  }),
};
