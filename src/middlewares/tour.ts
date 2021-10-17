import {param, query} from "express-validator";
import {ARRANGE_VALUES, CONTENT_TYPE_ID_VALUES} from "@/constants";
import {isExistAndIn, isExistAndNumeric, isIn} from "@/helpers";

export const validateGetManyRequest = [
    query('numOfRows', '정수여야 합니다.').optional().isInt(),
    query('pageNo', '정수여야 합니다.').optional().isInt(),
    query('arrange').optional().custom(value => isIn(value, ARRANGE_VALUES)),
    query('contentTypeId').optional().custom(value => isIn(value, CONTENT_TYPE_ID_VALUES)),
    query('mapX').custom(isExistAndNumeric),
    query('mapY').custom(isExistAndNumeric),
    query('radius').custom(isExistAndNumeric),
]

export const validateGetOneRequest = [
    param('id').exists(),
    query('contentTypeId').custom(isExistAndIn),
]