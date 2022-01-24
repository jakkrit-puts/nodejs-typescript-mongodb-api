import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = async function (userPassword: string) {
    const user = this as UserDocument;
    return bcrypt.compare(userPassword, user.password).catch((e) => false)
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
