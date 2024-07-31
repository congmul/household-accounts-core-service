import JoiBase from "joi";
import JoiDate from "@joi/date";
import { validObjectId } from "./validate.middleware";

const Joi = JoiBase.extend(JoiDate);

export const validCategory = {
  body: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
    name: Joi.string().required(),
    icon: Joi.string(),
    color: Joi.string(),
  }),
};
export const validGetCategory = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validObjectId).required(),
  }),
};
