/**
 * 사용자 토큰 획득
 */
import axios from 'axios'
import { URLSearchParams } from 'url'

import { User } from '@/types'
import { KAKAO_AUTH_BASE_URL, PATH_KAKAO_GET_ACCESS_TOKEN } from '@/constants'

import Request = User.Service.GetAccessToken.Request

export async function getAccessToken(req: Request): Promise<any> {
  const url = `${KAKAO_AUTH_BASE_URL}${PATH_KAKAO_GET_ACCESS_TOKEN}`
  console.info('call kakao oauth token API')
  const params = getKakaoAuthParams()
  params.append('code', req.code)

  return axios.post(url, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
}

const kakaoRestApiClientId = '78d6955f5e1b6ced0773ef4d860429b9'
const kakaoGrantType = 'authorization_code'
const redirectUri = 'http://127.0.0.1:3005/api/users/oauth' // 임시 설정

function getKakaoAuthParams(): URLSearchParams {
  const params = new URLSearchParams()
  params.append('grant_type', kakaoGrantType)
  params.append('client_id', kakaoRestApiClientId)
  params.append('redirect_uri', redirectUri)
  return params
}
