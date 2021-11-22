import { Router } from 'express'
import passport from 'passport'

import {camelBody, upload, validateMintNFTRequest, wrapAsync} from '@/middlewares'
import {NftController} from '@/controllers'

const router = Router()

router.post('/',
  validateMintNFTRequest,
  passport.authenticate('token'), 
  camelBody,
  wrapAsync(NftController.mintNft),
)

router.post('/image',
  passport.authenticate('token'),
  upload.single('image'),
  wrapAsync(NftController.uploadImage),
)

export default {
  name: 'nft',
  router
}
