import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";

export const verifyAdminInPage = async (
  req: IncomingMessage
): Promise<boolean> => {
  const session = await getSession({ req });
  if (!session) {
    return false;
  }

  const { role } = session.user as { role: string };
  if (role !== "admin") {
    return false;
  }

  return true;
};
