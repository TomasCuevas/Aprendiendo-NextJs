import fs from "fs";
import { NextApiRequest } from "next";
import formidable from "formidable";

const saveFile = async (file: formidable.File) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  fs.unlinkSync(file.filepath);
  return;
};

export const parseFiles = async (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return reject(error);
      }

      await saveFile(files.file as formidable.File);
      resolve(true);
    });
  });
};
