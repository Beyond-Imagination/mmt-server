import axios from 'axios'

import {getAccessToken, getUserInfo} from '@/services'
import User, {IUser} from '@/models/user'
import {success} from '@/helpers'
import {KakaoUserAuthorizationCodeExpired} from '@/errors'
import {KAKAO_API_BASE_URL, PATH_KAKAO_USER_LOGOUT} from '@/constants'

const oauth = async (req, res) => {
  await getAccessToken({ code: req.query.code.toString() }).then(
    async (response) => {
      const userInfo = await getUserInfo(response.data.access_token)

      User.findOne({ kakaoUserId: userInfo.kakaoUserId as number }).exec(async function (err, user) {
        if (!user) {
          await new User({
            nickname: userInfo.nickname,
            kakaoUserId: userInfo.kakaoUserId,
            profileImageUri: userInfo.profileImageUri,
            accessToken: response.data.access_token,
          }).save()
        } else {
          user.accessToken = response.data.access_token
          await user.save()
        }
      })

      success(res, response.data)
    },
    async (error) => {
      throw new KakaoUserAuthorizationCodeExpired(error)
    }
  )
}

const login = async (req, res) => {
  const userInfo = await getUserInfo(req.body.accessToken)

  User.findOne({ kakaoUserId: userInfo.kakaoUserId as number }).exec(async function (err, user) {
    let isKlipLinked = false
    if (!user) {
      await new User({
        nickname: userInfo.nickname,
        kakaoUserId: userInfo.kakaoUserId,
        profileImageUri: userInfo.profileImageUri,
        accessToken: req.body.accessToke,
      }).save()
    } else {
      user.accessToken = req.body.accessToken
      await user.save()
      if(user.klaytnAddress) {
        isKlipLinked = true
      }
    }

    success(res, {isKlipLinked})
  })
}

const mine = async (req, res) => {
  let user = req.user as IUser
  success(res, {
    nickname: user.nickname,
    kakaoUserId: user.kakaoUserId,
    profileImageUri: user.profileImageUri,
    klaytnAddress: user.klaytnAddress,
    nftList: user.nftList.map((nft) => {
      return {
        contentId: nft.contentId,
        nftId: nft.nftId,
        image: nft.image,
        title: nft.title,
        weather: nft.weather,
        emotion: nft.emotion,
        impression: nft.impression,
        txHash: nft.txHash,
      }
    }),
  })
}

const klaytnAddress = async (req, res) => {
  let user = req.user as IUser
  user.klaytnAddress = req.body.klaytnAddress
  await user.save()
  success(res, {})
}

const logout = async (req, res) => {
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
}

const leave = async (req, res) => {
  const url = `${KAKAO_API_BASE_URL}${PATH_KAKAO_USER_LOGOUT}`
  console.info('call user logout function')

  const response = await axios.post(url, {
    headers: {
      Authorization: req.get('Authorization'),
    },
  })

  const { status } = response

  if (status != 200) {
    throw Error('Can\'t unlink')
  } else {
    return success(res, {})
  }
}

export default {
  oauth,
  login,
  mine,
  klaytnAddress,
  logout,
  leave
}