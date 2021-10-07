/**
 * 사용자 정보 조회
 */
import axios from 'axios'

import { User } from '@/types'
import { KAKAO_API_BASE_URL, PATH_KAKAO_GET_USER } from '@/constants'

import Request = User.Service.GetUserInfo.Request
import Response = User.Service.GetUserInfo.Response

export async function getUserInfo(req: Request): Promise<Response> {
  const url = `${KAKAO_API_BASE_URL}/${PATH_KAKAO_GET_USER}`

  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${req.accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const { data } = response
  return { kakaoUserId: data.id, nickname: data.properties.nickname, profileImageUri: data.properties.profile_image }
}
