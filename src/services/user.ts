import {URLSearchParams} from 'url'
import {KAKAO_API_BASE_URL, KAKAO_AUTH_BASE_URL, PATH_KAKAO_GET_ACCESS_TOKEN, PATH_KAKAO_GET_USER} from '@/constants'
import axios from 'axios'
import { User } from '@/types'
import Request = User.Service.GetAccessToken.Request
import UserModel = User.Service.GetUserInfo.UserModel
import {KakaoUserAuthorizationCodeExpired} from '@/errors'

export class UserService {
    private readonly kakaoRestApiClientId: string;
    private readonly kakaoGrantType: string;
    private readonly redirectUri: string;

    constructor() {
      this.kakaoRestApiClientId = '78d6955f5e1b6ced0773ef4d860429b9'
      this.kakaoGrantType = 'authorization_code'
      this.redirectUri = 'http://127.0.0.1:3005/api/users/oauth' // 임시 설정
    }

    getKakaoAuthParams(): URLSearchParams {
      const params = new URLSearchParams()
      params.append('grant_type', this.kakaoGrantType)
      params.append('client_id', this.kakaoRestApiClientId)
      params.append('redirect_uri', this.redirectUri)
      return params
    }

    /**
     * 사용자 토큰 획득
     */
    async getAccessToken(req: Request): Promise<any> {
      const url = `${KAKAO_AUTH_BASE_URL}${PATH_KAKAO_GET_ACCESS_TOKEN}`
      console.info('call kakao oauth token API')
      const params = this.getKakaoAuthParams()
      params.append('code', req.code)

      return axios.post(url, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then((response) => {
          return response
        })
        .catch(e => {
          throw new KakaoUserAuthorizationCodeExpired(e)
        })
    }

    /**
     * 사용자 정보 조회
     */
    async getUserInfo(token: String): Promise<UserModel> {
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
}