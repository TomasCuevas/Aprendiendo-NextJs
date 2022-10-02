import type { NextApiRequest, NextApiResponse } from "next";

//* utils *//
import { verifyAdmin } from "../../../utils/verifyAdmin";
import { parseFiles } from "../../../utils/parseFiles";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return uploadFile(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await verifyAdmin(req, res);

  await parseFiles(req);

  return res.status(200).json({ message: "Imagen subida correctamente." });
};