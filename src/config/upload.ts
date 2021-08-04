import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  uploadImgPath: tmpPath,
  storage: multer.diskStorage({
    destination: tmpPath,
    filename(request, file, callback) {
      const randomHexStr = crypto.randomBytes(10).toString('HEX');
      const filename = `${randomHexStr}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
