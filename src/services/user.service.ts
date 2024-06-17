import { IUser, User, UserDTO, UserModel } from "@models/user.model";
import bcrypt from "bcrypt";
import crypto from "crypto";

export default class UserService {
  private generateUserCode(length = 8) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async createUser(user: IUser) {
    let newUser = new User(user);
    newUser.preCreate();

    newUser.passwrord = bcrypt.hashSync(
      newUser.passwrord,
      bcrypt.genSaltSync(10)
    );
    newUser.apiKey = crypto.randomBytes(32).toString("hex");
    newUser.secureKey = crypto.randomBytes(64).toString("base64");
    newUser.code = this.generateUserCode();

    let result = await UserModel.create(newUser);
    return new UserDTO(result);
  }
}
