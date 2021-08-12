import { Schema } from 'dynamoose'

export const ImageSchema = new Schema({
  name: String,
  mimetype: String,
  size: Number,
  url: String
})

export const ImageInfoSchema = new Schema({
  original: ImageSchema,
  low: ImageSchema,
  thumbnail: ImageSchema
})
