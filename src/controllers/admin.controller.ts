import { AdminDTO } from "@models/admin.model";
import AdminService from "@services/admin.service";
import { NextFunction, Request, Response } from "express";

export default class AdminController {
  private adminService = new AdminService();

  async createSuperAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      let data = await this.adminService.createSuperAdmin(req.body);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let data = await this.adminService.login(req.body);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try{
      res.json(new AdminDTO(req.admin as any))
    }
    catch(err){
      next(err)
    }
  }
}
