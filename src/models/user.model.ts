import { Schema, model } from "mongoose";
import BaseModel from ".";

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  password: string;
  code: string;
  apiKey: string;
  secureKey: string;
  createdAt: string;
  updatedAt: string;
}

export class User extends BaseModel {
  fullname: string;
  email: string;
  passwrord: string;
  code: string;
  apiKey: string;
  secureKey: string;

  constructor(obj: IUser) {
    super(obj);
    this.fullname = obj.fullname;
    this.email = obj.email;
    this.passwrord = obj.password;
    this.code = obj.code;
    this.apiKey = obj.apiKey;
    this.secureKey = obj.secureKey;
  }
}

export class UserDTO extends BaseModel {
  fullname: string;
  email: string;
  code: string;
  apiKey: string;
  secureKey: string;

  constructor(obj: IUser) {
    super(obj);
    this.fullname = obj.fullname;
    this.email = obj.email;
    this.code = obj.code;
    this.apiKey = obj.apiKey;
    this.secureKey = obj.secureKey;
  }
}

const userSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  code: String,
  apiKey: String,
  secureKey: String,
  createdAt: Date,
  updatedAt: Date,
});

userSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export const UserModel = model<IUser>("User", userSchema, "User");
