import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

import {FailedToCallAPIError} from '@/errors'

/**
 * 사용자 확인
 * https://developers.kakao.com/docs/latest/ko/kakaostory/rest-api#validate-user
 * */
export function isStoryUser(accessToken) {
  try {
    console.info('call isStoryUser function')

    const config: AxiosRequestConfig = {
      method: 'get',
      url: 'https://kapi.kakao.com/v1/api/story/isstoryuser',
      headers: {
        'Authorization': accessToken
      }
    }

    return axios(config)
      .then(res => {
        return res.data
      })
      .catch(e => {
        console.error(e.status, e.statusText, e.response.data)
        throw new FailedToCallAPIError(e.response.data)
      })
  } catch (e) {
    throw new FailedToCallAPIError(e.message)
  }
}

/**
 * 동의내역 확인하기
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#check-consent
 */
export function checkConsent(accessToken, scopes) {
  try {
    console.info('call checkConsent function')

    const config: AxiosRequestConfig = {
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/scopes',
      headers: {
        'Authorization': accessToken
      },
      params: {
        scopes: scopes
      },
    }

    return axios(config)
      .then(res => {
        return res.data
      })
      .catch(e => {
        console.error(e.status, e.statusText, e.response.data)
        throw new FailedToCallAPIError(e.response.data)
      })
  } catch (e) {
    throw new FailedToCallAPIError(e.message)
  }
}

/**
 * 이미지 업로드 하기
 * https://developers.kakao.com/docs/latest/ko/kakaostory/rest-api#upload-image
 */
export function uploadImages(accessToken, file) {
  try {
    console.info('call uploadImages function')

    const FormData = require('form-data')
    const data = new FormData()

    data.append('file', file, 'filename')

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://kapi.kakao.com/v1/api/story/upload/multi',
      headers: {
        'Authorization': accessToken,
        ...data.getHeaders()
      },
      data: data
    }

    return axios(config)
      .then(res => {
        return res.data
      })
      .catch(e => {
        console.error(e.status, e.statusText, e.response.data)
        throw new FailedToCallAPIError(e.response.data)
      })
  } catch (e) {
    throw new FailedToCallAPIError(e.message)
  }
}

/**
 * 사진 스토리 쓰기
 * https://developers.kakao.com/docs/latest/ko/kakaostory/rest-api#write-story
 */
export function postPhotoStory(accessToken, imageUrlList) {
  try {
    console.info('call postPhotoStory function')

    const data = qs.stringify({
      image_url_list: JSON.stringify(imageUrlList), // 이미지 업로드하기 API를 통해 얻은 이미지들의 경로와 이미지의 가로와 세로 길이
      // content: null, 스토리에 들어갈 글, 2048자(char) 미만으로 제한
      // todo: 앱 URL 나오면 추가하기
      // android_exec_param	String	스토리의 [해당 앱으로 이동] 버튼을 눌렀을 때 Android 앱 실행 URL에 붙일 파라미터	X
      // ios_exec_param	String	스토리의 [해당 앱으로 이동] 버튼을 눌렀을 때 iOS 앱 실행 URL에 붙일 파라미터	X
      // android_market_param	String	스토리에서 오픈마켓으로 이동할 때 실행 URL에 붙일 파라미터	X
      // ios_market_param	String	스토리에서 앱스토어로 이동할 때 실행 URL에 붙일 파라미터	X
    })

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://kapi.kakao.com/v1/api/story/post/photo',
      headers: {
        'Authorization': accessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data
    }

    return axios(config)
      .then(res => {
        return res.data
      })
      .catch(e => {
        console.error(e.status, e.statusText, e.response.data)
        throw new FailedToCallAPIError(e.response.data)
      })
  } catch (e) {
    throw new FailedToCallAPIError(e.message)
  }
}