import {body} from 'express-validator'

export const validateMintNFTRequest = [
  body('content_id').exists(),
  body('title').exists(),
  body('weather').exists(),
  body('emotion').exists(),
  body('impression').exists(),
  body('image').exists(),
]