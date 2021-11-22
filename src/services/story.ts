import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

import {FailedToCallAPIError} from '@/errors'

export class StoryService {
  private readonly accessToken: string;
  private readonly baseURL: string;

  constructor(accessToken) {
    this.accessToken = accessToken
    this.baseURL = 'https://kapi.kakao.com'
  }

  async callStoryAPI(config: AxiosRequestConfig) {
    config.baseURL = this.baseURL
    config.headers = {'Authorization': this.accessToken, ...config.headers}

    return axios(config)
      .then(res => {
        return res.data
      })
      .catch(e => {
        console.error(e.status, e.statusText, e.response.data)
        throw new FailedToCallAPIError(e.response.data)
      })
  }

  /**
   * 사용자 확인
   * https://developers.kakao.com/docs/latest/ko/kakaostory/rest-api#validate-user
   */
  isStoryUser() {
    try {
      console.info('call isStoryUser function')

      const config: AxiosRequestConfig = {
        method: 'get',
        url: '/v1/api/story/isstoryuser',
      }

      return this.callStoryAPI(config)
    } catch (e) {
      throw new FailedToCallAPIError(e.message)
    }
  }

  /**
   * 동의내역 확인하기
   * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#check-consent
   */
  checkConsent(scopes) {
    try {
      console.info('call checkConsent function')

      const config: AxiosRequestConfig = {
        method: 'get',
        url: '/v2/user/scopes',
        params: {
          scopes: scopes
        },
      }

      return this.callStoryAPI(config)
    } catch (e) {
      throw new FailedToCallAPIError(e.message)
    }
  }

  /**
   * 이미지 업로드 하기
   * https://developers.kakao.com/docs/latest/ko/kakaostory/rest-api#upload-image
   */
  uploadImages(file) {
    try {
      console.info('call uploadImages function')

      const FormData = require('form-data')
      const data = new FormData()

      data.append('file', file, 'filename')

      const config: AxiosRequestConfig = {
        method: 'post',
        url: '/v1/api/story/upload/multi',
        headers: {
          ...data.getHeaders()
        },
        data: data
      }

      return this.callStoryAPI(config)
    } catch (e) {
      throw new FailedToCallAPIError(e.message)
    }
  }

  /**
   * 사진 스토리 쓰기
   * https://developers.kakao.com/docs/latest/ko/kakaostory/rest-api#write-story
   */
  postPhotoStory(accessToken, imageUrlList) {
    try {
      console.info('call postPhotoStory function')

      const data = qs.stringify({
        image_url_list: JSON.stringify(imageUrlList),
      })

      const config: AxiosRequestConfig = {
        method: 'post',
        url: '/v1/api/story/post/photo',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data
      }

      return this.callStoryAPI(config)
    } catch (e) {
      throw new FailedToCallAPIError(e.message)
    }
  }
}
