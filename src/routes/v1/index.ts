import { Router } from "express";
import AdminRouter from "./admin.route";
import UserRouter from "./user.route";


export function RoutersV1() {
  const router = Router();
  new AdminRouter(router).instance();
  new UserRouter(router).instance();
  
  return router;
}
