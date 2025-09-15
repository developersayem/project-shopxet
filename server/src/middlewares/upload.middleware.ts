import multer from "multer";
import fs from "fs";
import path from "path";

// helper to create folder if not exists
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// factory function to create multer instance for a specific folder
export const uploadTo = (folderName: string) => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      const folder = path.join("uploads", folderName);
      ensureDir(folder);
      cb(null, folder);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${ext}`;
      cb(null, uniqueName);
    },
  });

  return multer({
    storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  });
};
