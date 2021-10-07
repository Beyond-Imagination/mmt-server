import { response, Router } from 'express'
import { header, body } from 'express-validator'
import axios from 'axios'

import { wrapAsync } from '@/middlewares/async.middleware'
import { success } from '@/helpers/response'
import { KakaoUserAuthorizationCodeExpired } from '@/errors'
import { FailedToCallAPIError } from '@/errors'

import User, { IUser } from '@/models/user'
import { getAccessToken, getUserInfo } from '@/services'

import { KAKAO_API_BASE_URL, PATH_KAKAO_USER_LOGOUT } from '@/constants'

const router = Router()

router.get(
  '/oauth',
  wrapAsync(async (req, res) => {
    await getAccessToken({ code: req.query.code.toString() }).then(
      async (response) => {
        const userInfo = await getUserInfo({ accessToken: response.data.access_token })

        // if old user
        // else new user
        await new User({
          name: userInfo.nickname,
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
  wrapAsync(async (req, res) => {
    /*
    {
      "name": String,
      "profile_image": String,
      "klaytn_address": String,
      "nft_list": [NFT1, NFT2, NFT3, ...],
    }
    */
    success(res, [])
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
