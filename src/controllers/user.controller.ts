import UserService from "@services/user.service";
import { NextFunction, Request, Response } from "express";

export default class UserController {
    private userService = new UserService();

    async createUser(req: Request, res: Response, next: NextFunction) {
        let data = await this.userService.createUser(req.body);
        res.json(data);
    }
}