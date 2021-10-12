/**
 * 사용자 정보 조회
 */
import axios from 'axios'

import { User } from '@/types'
import { KAKAO_API_BASE_URL, PATH_KAKAO_GET_USER } from '@/constants'

import UserModel = User.Service.GetUserInfo.UserModel

export async function getUserInfo(token: String): Promise<UserModel> {
  const url = `${KAKAO_API_BASE_URL}/${PATH_KAKAO_GET_USER}`

  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const { data } = response
  return { kakaoUserId: data.id, nickname: data.properties.nickname, profileImageUri: data.properties.profile_image }
}
