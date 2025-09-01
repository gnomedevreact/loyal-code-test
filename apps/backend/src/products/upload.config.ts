// products/upload.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const PRODUCT_UPLOAD_DIR = 'uploads/products';

export const productMulterOptions = {
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg'].includes(
      file.mimetype,
    );
    cb(ok ? null : new Error('Only image files are allowed'), ok);
  },
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      if (!existsSync(PRODUCT_UPLOAD_DIR))
        mkdirSync(PRODUCT_UPLOAD_DIR, { recursive: true });
      cb(null, PRODUCT_UPLOAD_DIR);
    },
    filename: (_req, file, cb) => {
      const name = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, name + extname(file.originalname).toLowerCase());
    },
  }),
};
