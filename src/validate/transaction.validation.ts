import JoiBase from "joi";
import JoiDate from "@joi/date";
import { validObjectId } from "./validate.middleware";

const Joi = JoiBase.extend(JoiDate);

export const validTransaction = {
  body: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
    date: Joi.date().format("YYYY-MM-DD").required(),
    type: Joi.string().valid("income", "expense", "investment").required(),
    amount: Joi.number().required(),
    category: Joi.string(),
    subcategory: Joi.string(),
    note: Joi.string(),
    pending: Joi.boolean().default(false),
    fixedExpenseMonthly: Joi.boolean().default(false),
    endDate: Joi.date().format("YYYY-MM-DD").optional(),
    paymentMethod: Joi.string().default("Credit Card"),
  }),
};

export const validGetTransaction = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
  }),
  query: Joi.object().keys({
    type: Joi.string().valid("income", "expense", "investment").required(),
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
    groupBy: Joi.string().default("date"),
  }),
};
export const validPatchTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(validObjectId).required(),
  }),
  body: Joi.object().keys({
    date: Joi.date().format("YYYY-MM-DD"),
    type: Joi.string().valid("income", "expense", "investment"),
    amount: Joi.number(),
    category: Joi.string(),
    subcategory: Joi.string(),
    note: Joi.string(),
    pending: Joi.boolean(),
    fixedExpenseMonthly: Joi.boolean(),
    fixedSeriesId: Joi.string().optional(),
    endDate: Joi.date().format("YYYY-MM-DD").optional(),
    paymentMethod: Joi.string().valid("Credit Card", "Cash"),
  }),
};
export const validDeleteTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(validObjectId).required(),
  }),
};
export const validDeleteFixedExpense = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(validObjectId).required(),
    fixedSeriesId: Joi.string().required(),
  }),
  query: Joi.object().keys({
    action: Joi.string()
      .valid("all", "following", "only_one")
      .default("only_one"),
  }),
};
