/**
 * 반복 정보 조회 오퍼레이션
 */

import axios from 'axios'

import {BASE_URL, MOBILE_APP, MOBILE_OS, SUCCESS} from '@/constants'
import {Tour} from '@/types'
import {FailedToCallAPIError} from '@/errors'
import {env} from '@/env'

import Response = Tour.Service.GetDetailInfo.Response;
import Request = Tour.Service.GetDetailInfo.Request;

export async function getDetailInfo(params: Request): Promise<Response> {
  try {
    const {tour: {serviceKey}} = env
    const url = `${BASE_URL}/detailInfo`

    console.info('call getDetailInfo function')

    const response = await axios.get(url, {
      params: {
        ...params,
        MobileOS: MOBILE_OS,
        MobileApp: MOBILE_APP,
        ServiceKey: serviceKey,
      },
    })

    const {data} = response
    const {header, body} = data.response

    if (header.resultCode != SUCCESS) {
      throw Error(header.resultMsg)
    }

    return body
  } catch (e) {
    throw new FailedToCallAPIError(e.message)
  }
}