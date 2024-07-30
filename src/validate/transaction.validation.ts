import JoiBase from "joi";
import JoiDate from "@joi/date";
import { validObjectId } from "./validate.middleware";

const Joi = JoiBase.extend(JoiDate);

export const validTransaction = {
  body: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
    date: Joi.date().format("YYYY-MM-DD").required(),
    type: Joi.string().valid("income", "expense").default("expense"),
    amount: Joi.number().required(),
    category: Joi.string(),
    note: Joi.string(),
    paymentMethod: Joi.string().default("Credit Card"),
  }),
};

export const validGetTransaction = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
  }),
  query: Joi.object().keys({
    type: Joi.string().valid("income", "expense").required(),
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
export const validPatchTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(validObjectId).required(),
  }),
  body: Joi.object().keys({
    date: Joi.date().format("YYYY-MM-DD"),
    type: Joi.string().valid("income", "expense"),
    amount: Joi.number(),
    category: Joi.string(),
    note: Joi.string(),
    paymentMethod: Joi.string().valid("Credit Card", "Cash"),
  }),
};
