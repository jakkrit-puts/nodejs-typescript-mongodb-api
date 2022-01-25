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

UserSchema.pre("save", async function (this: UserDocument, next: any) {
  let user = this as UserDocument;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.get("salt"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (userPassword: string) {
  const user = this as UserDocument;
  return bcrypt.compare(userPassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
