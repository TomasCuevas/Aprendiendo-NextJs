import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const verifyAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(400).json({
      message: "Necesitas una sesion activa.",
    });
  }

  const { role } = session.user as { role: string };
  if (role !== "admin") {
    return res.status(400).json({
      message: "Solo los administradores tienen acceso.",
    });
  }
};
