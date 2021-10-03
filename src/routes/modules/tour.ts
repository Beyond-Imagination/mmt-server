import { Router } from 'express'
import {param, query} from 'express-validator'

import { wrapAsync } from '@/middlewares'
import { TourController } from "@/controllers";
import {ARRANGE_VALUES, CONTENT_TYPE_ID_VALUES} from "@/constants";

const router = Router();

// todo: validation 더 이쁘게 할 수 있는 방법 찾기
router.get('/',
    [
        query('numOfRows').optional(),
        query('pageNo').optional(),
        query('arrange').optional().isIn(ARRANGE_VALUES),
        query('contentTypeId').optional().isIn(CONTENT_TYPE_ID_VALUES),
        query('mapX').exists(),
        query('mapY').exists(),
        query('radius').exists(),
    ],
    wrapAsync(TourController.index)
);
router.get('/:id',
    param('id').exists(),
    query('contentTypeId').exists().isIn(CONTENT_TYPE_ID_VALUES),
    wrapAsync(TourController.show)
);

export default {
    router,
    name: 'tour'
}
