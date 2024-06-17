import { Router } from "express";
import BaseRouter from "../base.route";
import AdminController from "@controllers/admin.controller";
import AdminValidator from "@validators/admin.validator";
import { formValidate } from "@validators/index";
import adminMiddleware from "@middleware/admin.middleware";

export default class AdminRouter extends BaseRouter {
  private controller = new AdminController();
  private validator = new AdminValidator();

  constructor(router: Router) {
    super({ pathBase: "/admin", router });
  }

  instance() {
    this.router.post(
      this.path("/"),
      formValidate(this.validator.createSuperAdmin()),
      this.controller.createSuperAdmin.bind(this.controller)
    );

    this.router.post(
      this.path("/login"),
      formValidate(this.validator.login()),
      this.controller.login.bind(this.controller)
    );

    this.router.get(
      this.path("/profile"),
      adminMiddleware,
      this.controller.getProfile.bind(this.controller)
    );
  }

}
