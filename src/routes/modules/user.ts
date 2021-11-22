import { Router } from 'express'
import { body, header } from 'express-validator'
import passport from 'passport'

import { wrapAsync, camelBody } from '@/middlewares'
import {UserController} from '@/controllers'

const router = Router()

router.get(
  '/oauth',
  wrapAsync(UserController.oauth)
)

router.post(
  '/login',
  body('access_token').exists(),
  camelBody,
  wrapAsync(UserController.login)
)

// 회원 내정보 조회
router.get(
  '/mine',
  passport.authenticate('token'),
  wrapAsync(UserController.mine)
)

export class UserResponse {
  nickname: String
  profile_image: String
  klaytn_address: String
  nft_list: Array<String>

  constructor(
    nickname: String = '',
    profileImageUri: String = '',
    klaytnAddress: String = '',
    nftList: Array<String> = []
  ) {
    this.nickname = nickname
    this.profile_image = profileImageUri
    this.klaytn_address = klaytnAddress
    this.nft_list = nftList
  }
}

router.post(
  '/klaytnAddress',
  body('klaytn_address').exists(),
  camelBody,
  passport.authenticate('token'),
  wrapAsync(UserController.klaytnAddress)
)

// 회원 로그아웃
router.delete(
  '/out',
  header('Authorization').exists(),
  wrapAsync(UserController.logout)
)

// 회원 탈퇴
router.delete(
  '/leave',
  header('Authorization').exists(),
  wrapAsync(UserController.leave)
)

export default {
  name: 'users',
  router,
}
