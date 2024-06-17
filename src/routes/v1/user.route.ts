import { Router } from "express";
import BaseRouter from "../base.route";
import UserController from "@controllers/user.controller";
import UserValidator from "@validators/user.validator";
import adminMiddleware from "@middleware/admin.middleware";
import { formValidate } from "@validators/index";

export default class UserRouter extends BaseRouter {
  private controller = new UserController();
  private validator = new UserValidator();

  constructor(router: Router) {
    super({ pathBase: "/user", router });
  }

  instance() {
    this.router.post(
      this.path("/"),
      adminMiddleware,
      formValidate(this.validator.createUser()),
      this.controller.createUser.bind(this.controller)
    );
  }
}
