import { Router } from 'express'
import passport from "passport";

import {validateGetManyRequest, validateGetOneRequest, wrapAsync} from '@/middlewares'
import { TourController } from "@/controllers";

const router = Router();

router.get('/',
    passport.authenticate('token'),
    validateGetManyRequest,
    wrapAsync(TourController.index)
);
router.get('/:id',
    passport.authenticate('token'),
    validateGetOneRequest,
    wrapAsync(TourController.show)
);

export default {
    router,
    name: 'tour'
}
