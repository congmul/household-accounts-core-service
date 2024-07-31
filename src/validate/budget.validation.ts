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
