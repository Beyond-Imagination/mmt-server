import {CustomValidator} from "express-validator";

export const isExistAndNumeric: CustomValidator = value => {
    if (!value) {
        throw new Error('반드시 필요합니다.');
    }

    if (isNaN(value)) {
        throw new Error('숫자여야 합니다.');
    }

    return true;
};

export const isIn = (value, type) => {
    if (!type.includes(value)) {
        throw new Error(`[${type}] 중 하나여야 합니다.`);
    }

    return true;
};

export const isExistAndIn = (value, type) => {
    if (!value) {
        throw new Error('반드시 필요합니다.');
    }

    if (!type.includes(value)) {
        throw new Error(`[${type}] 중 하나여야 합니다.`);
    }

    return true;
};
