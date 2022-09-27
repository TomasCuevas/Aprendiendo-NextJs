import bcrypt from "bcryptjs";

//* database *//
import { connect } from "./config";
import UserModel from "./models/User";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await connect();

  const user = await UserModel.findOne({ email });
  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) return null;

  const { name, role, _id } = user;

  return {
    _id,
    email: email.toLowerCase(),
    name,
    role,
  };
};
