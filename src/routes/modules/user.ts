import { Router } from 'express'
import { body, header } from 'express-validator'
import axios from 'axios'
import passport from 'passport'

import { wrapAsync, camelBody } from '@/middlewares'
import { success } from '@/helpers/response'
import { KakaoUserAuthorizationCodeExpired } from '@/errors'
import { FailedToCallAPIError } from '@/errors'

import User, { IUser } from '@/models/user'
import NFT from '@/models/nft'
import { getAccessToken, getUserInfo } from '@/services'
import { KAKAO_API_BASE_URL, PATH_KAKAO_USER_LOGOUT } from '@/constants'

const router = Router()

router.get(
  '/oauth',
  wrapAsync(async (req, res) => {
    await getAccessToken({ code: req.query.code.toString() }).then(
      async (response) => {
        const userInfo = await getUserInfo(response.data.access_token)

        // if old user

        // else new user
        await new User({
          nickname: userInfo.nickname,
          kakaoUserId: userInfo.kakaoUserId,
          profileImageUri: userInfo.profileImageUri,
          accessToken: response.data.access_token,
        }).save()

        success(res, response.data)
      },
      async (error) => {
        throw new KakaoUserAuthorizationCodeExpired(error)
      }
    )
  })
)

// 회원 내정보 조회
router.get(
  '/mine',
  passport.authenticate('token'),
  wrapAsync(async (req, res) => {
    let user = req.user as IUser;
    success(res, {
      "nickname": user.nickname,
      "kakaoUserId": user.kakaoUserId,
      "profileImageUri": user.profileImageUri,
      "klaytnAddress": user.klaytnAddress,
      "nftList": user.nftList.map(nft => {
        return { 
          "contentId": nft.contentId, 
          "nftId": nft.nftId,
          "image": nft.image,
          'title': nft.title,
          "weather": nft.weather,
          "emotion": nft.emotion,
          "impression": nft.impression,
          "txHash": nft.txHash,
        }
      }),
    });
  }),
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
  wrapAsync(async (req, res) => {
    let user = req.user as IUser;
    user.klaytnAddress = req.body.klaytnAddress;
    await user.save();
    success(res, {});
  })
)

// 회원 로그아웃
router.delete(
  '/out',
  header('Authorization').exists(),
  wrapAsync(async (req, res) => {
    try {
      const url = `${KAKAO_API_BASE_URL}${PATH_KAKAO_USER_LOGOUT}`
      console.info('call user logout function')

      const response = await axios.post(url, {
        headers: {
          Authorization: req.get('Authorization'),
        },
      })

      const { status } = response

      if (status != 200) {
        throw Error('Can not logout')
      } else {
        return success(res, {})
      }
    } catch (error) {
      throw new FailedToCallAPIError(error.message)
    }
  })
)

// 회원 탈퇴
router.delete(
  '/leave',
  header('Authorization').exists(),
  wrapAsync(async (req, res) => {
    try {
      const url = `${KAKAO_API_BASE_URL}${PATH_KAKAO_USER_LOGOUT}`
      console.info('call user logout function')

      const response = await axios.post(url, {
        headers: {
          Authorization: req.get('Authorization'),
        },
      })

      const { status } = response

      if (status != 200) {
        throw Error("Can't unlink")
      } else {
        return success(res, {})
      }
    } catch (error) {
      throw new FailedToCallAPIError(error.message)
    }
  })
)

export default {
  name: 'users',
  router,
}
