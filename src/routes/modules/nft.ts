import { Router } from 'express';
import passport from 'passport';
import { body, validationResult } from 'express-validator';

import { mintNFT } from '@/services/nft';
import wrapAsync from '@/middlewares/async.middleware';
import { success } from '@/helpers/response'

const router = Router();

router.post('/', 
    [
        body('contentId').exists(),
        body('title').exists(),
        body('weather').exists(),
        body('emotion').exists(),
        body('impression').exists(),
        body('image').exists(),
    ],
    passport.authenticate('token'), 
    async (req, res, next) => {
        try {
            let nft = await mintNFT(req.user, req.body);
            res.status(200).json(nft);
        } catch (error) {
            next(error);
        }
    },
)

export default {
    name: 'nft',
    router
}
