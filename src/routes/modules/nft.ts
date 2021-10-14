import { Router } from 'express';
import passport from 'passport';
import { body, validationResult } from 'express-validator';

import { mintNFT } from '@/services/nft';
import { wrapAsync, camelBody } from '@/middlewares';
import { upload } from '@/middlewares/multer';
import { success } from '@/helpers'

const router = Router();

router.post('/', 
    [
        body('content_id').exists(),
        body('title').exists(),
        body('weather').exists(),
        body('emotion').exists(),
        body('impression').exists(),
        body('image').exists(),
    ],
    passport.authenticate('token'), 
    camelBody,
    async (req, res, next) => {
        try {
            let nft = await mintNFT(req.user, req.body);
            success(res, nft)
        } catch (error) {
            next(error);
        }
    },
)

router.post('/image',
    passport.authenticate('token'),
    upload.single("image"),
    (req, res, next) => {
        if(!req.file) {
            next(new Error("fail to upload image to s3"))
        } else {
            success(res, {"image": (req.file as Express.MulterS3.File).location})
        }
    }
)

export default {
    name: 'nft',
    router
}
