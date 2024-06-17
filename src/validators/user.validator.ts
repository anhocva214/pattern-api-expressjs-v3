import { check } from "express-validator";
import { MESSAGE_TYPE } from "./i18n/type";
import { ENV } from "@config/env.config";
import { UserModel } from "@models/user.model";

export default class UserValidator {
  constructor() {}

  createUser() {
    return [
      check("fullname").not().isEmpty().withMessage(MESSAGE_TYPE.required),
      check("email")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .isEmail()
        .withMessage(MESSAGE_TYPE.invalid)
        .trim()
        .normalizeEmail()
        .custom(async (email: string, { req }) => {
          const existingUser = await UserModel.exists({
            email,
          });
          if (existingUser) {
            throw new Error(MESSAGE_TYPE.exists);
          }
        }),
      ,
      check("password").not().isEmpty().withMessage(MESSAGE_TYPE.required),
    ];
  }
}
