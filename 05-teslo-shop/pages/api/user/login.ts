import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

//* database *//
import { db } from "../../../database";
import { UserModel } from "../../../database/models";

//* utils *//
import { jwt } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUser(req, res);

    default:
      return res.status(200).json({ message: "Bad request" });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;

  await db.connect();

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Correo o contraseña no validos.",
    });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({
      message: "Correo o contraseña no validos.",
    });
  }

  const { role, name, _id } = user;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      name,
      role,
    },
  });
};