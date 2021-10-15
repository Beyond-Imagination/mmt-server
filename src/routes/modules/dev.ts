import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';

import { wrapAsync } from '@/middlewares';
import { success } from '@/helpers'
import User from '@/models/user'

const router = Router();

router.post('/user',
    wrapAsync(async(req, res, next) => {
        let user = new User({
            "nickname": req.body.nickname || "홍길동",
            "profileImageUri": req.body.profile_image || "https://beyond-imagination-moment.s3.ap-northeast-2.amazonaws.com/dev/%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AB.png",
            "klaytnAddress": req.body.klaytn_address || "0x308061b1593a835E3298F067A40c8e1b2cB05D9D",
            "kakaoUserId": req.body.kakao_user_id || Math.floor(Math.random()*1000000),
            "accessToken": req.body.access_token || uuid(),
        })
        await user.save();
        success(res, {"access_token": user.accessToken});
    })
)

export default {
    name: 'dev',
    router
}
