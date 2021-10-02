import { Router } from 'express'
import { param } from 'express-validator'

import { wrapAsync } from '@/middlewares'
import { TourController } from "@/controllers";

const router = Router();

router.get('/', wrapAsync(TourController.index));
router.get('/:id', param('id').exists(), wrapAsync(TourController.show));

export default {
    router,
    name: 'tour'
}
