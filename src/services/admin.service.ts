import { Admin, AdminDTO, AdminModel, IAdmin } from "@models/admin.model";
import bcrypt from "bcrypt";
import JwtService from "./vendors/jwt.service";

export default class AdminService {
  private jwtService = new JwtService();

  async createSuperAdmin(admin: IAdmin) {
    let newAdmin = new Admin(admin);
    newAdmin.preCreate();

    newAdmin.password = bcrypt.hashSync(
      newAdmin.password,
      bcrypt.genSaltSync(10)
    );
    newAdmin.role = "super_admin";
    
    let result = await AdminModel.create(newAdmin);
    return new AdminDTO(result);
  }

  async login(params: { email: string; password: string }) {
    let admin = await AdminModel.findOne({
      email: params.email,
    });

    if (!admin) {
      throw new Error("User not found");
    }

    if (!bcrypt.compareSync(params.password, admin.password)) {
      throw new Error("Invalid password");
    }

    let data = new AdminDTO(admin);

    return {
      data,
      accessToken: this.jwtService.generateAccessToken({
        id: data?.id || "",
        email: data.email,
      }),
    };
  }
}
