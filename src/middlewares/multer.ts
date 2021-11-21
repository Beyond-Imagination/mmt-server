import path from 'path'
import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { v4 as uuidv4 } from 'uuid'
import {env} from '@/env'

const s3 = new AWS.S3()
const {aws: {s3BucketName}} = env

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3BucketName,
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname)
      cb(null, `image/${uuidv4()}${extension}`)
    },
    acl: 'public-read',
  })
})
