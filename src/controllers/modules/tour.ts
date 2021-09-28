// TODO: 구체화

import { Request, Response } from "express";

/**
 * 관광지 목록 조회
 * @param req
 * @param res
 */
const index = async (req: Request, res: Response) => {
    res.json('success to route /tour');
};

/**
 * 관광지 detail 조회
 * @param req
 * @param res
 */
const show = async (req: Request, res: Response) => {
    res.json('success to route /tour/:id');
};

export default {
    index,
    show
}