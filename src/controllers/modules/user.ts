import axios from 'axios'

import {UserService} from '@/services'
import User, {IUser} from '@/models/user'
import {success} from '@/helpers'
import {KAKAO_API_BASE_URL, PATH_KAKAO_USER_LOGOUT} from '@/constants'

const userService = new UserService()

const oauth = async (req, res) => {
  const response = await userService.getAccessToken({ code: req.query.code.toString() })
  const userInfo = await userService.getUserInfo(response.data.access_token)

  let user = await User.findOne({ kakaoUserId: userInfo.kakaoUserId as number })

  if (!user) {
    user = new User({
      nickname: userInfo.nickname,
      kakaoUserId: userInfo.kakaoUserId,
      profileImageUri: userInfo.profileImageUri,
      accessToken: response.data.access_token,
    })
  } else {
    user.accessToken = response.data.access_token
  }

  await user.save()

  success(res, response.data)
}

const login = async (req, res) => {
  const userInfo = await userService.getUserInfo(req.body.accessToken)
  let user = await User.findOne({ kakaoUserId: userInfo.kakaoUserId as number })

  if (!user) {
    user = new User({
      nickname: userInfo.nickname,
      kakaoUserId: userInfo.kakaoUserId,
      profileImageUri: userInfo.profileImageUri,
      accessToken: req.body.accessToken,
    })
  } else {
    user.accessToken = req.body.accessToken
  }

  await user.save()

  success(res, {isKlipLinked: !!user.klaytnAddress})
}

const mine = async (req, res) => {
  const user = req.user

  success(res, user)
}

const klaytnAddress = async (req, res) => {
  const user: IUser = req.user
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

  const {status} = response

  if (status != 200) {
    throw Error('Can not logout')
  }

  return success(res, {})
}

const leave = async (req, res) => {
  const url = `${KAKAO_API_BASE_URL}${PATH_KAKAO_USER_LOGOUT}`
  console.info('call user logout function')

  const response = await axios.post(url, {
    headers: {
      Authorization: req.get('Authorization'),
    },
  })

  const {status} = response

  if (status != 200) {
    throw Error('Can\'t unlink')
  }

  return success(res, {})
}

export default {
  oauth,
  login,
  mine,
  klaytnAddress,
  logout,
  leave
}