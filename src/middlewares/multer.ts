import path from 'path';
import AWS from "aws-sdk";
import multer from 'multer';
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3();

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        key: function (req, file, cb) {
            let extension = path.extname(file.originalname);
            cb(null, `image/${uuidv4()}${extension}`)
        },
        acl: 'public-read',
    })
})
