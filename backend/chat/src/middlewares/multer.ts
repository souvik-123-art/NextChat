import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
//storage banachhe specially cloudinary er
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "NextChat-images",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [
      {
        width: 800,
        height: 600,
        crop: "limit",
      },
      { quality: "auto" },
    ],
  } as any,
});
// nicher eta middleware er moddhei multiple ba single upload hoy
export const upload = multer({
  storage, //storage etake use korbe
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("/image/")) {
      cb(null, true);
    } else {
      cb(new Error("only image allowed"));
    }
  },// upload ta true korbe jdi onno file dey to error debe
});
