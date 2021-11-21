import axios from 'axios'

import {env} from '@/env'
import {Tour} from '@/types'
import {FailedToCallAPIError} from '@/errors'

import GetLocationBasedList = Tour.Service.GetLocationBasedList;
import GetDetailImage = Tour.Service.GetDetailImage;
import GetDetailInfo = Tour.Service.GetDetailInfo;
import GetDetailIntro = Tour.Service.GetDetailIntro;
import GetDetailCommon = Tour.Service.GetDetailCommon;

export class TourService {
    private readonly serviceKey: string;
    private readonly baseURL: string;
    private readonly mobileOS: string;
    private readonly mobileApp: string;
    private readonly successCode: string;

    constructor() {
      this.serviceKey = env.tour.serviceKey
      this.baseURL = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService'
      this.mobileOS = 'ETC'
      this.mobileApp = 'moment'
      this.successCode = '0000'
    }

    async callTourAPI(method, url, params) {
      return axios({
        url,
        method,
        baseURL: this.baseURL,
        params: {
          ...params,
          MobileOS: this.mobileOS,
          MobileApp: this.mobileApp,
          ServiceKey: this.serviceKey,
        },
      })
        .then((res) => {
          const {header, body} = res.data.response

          if (header.resultCode != this.successCode) {
            throw Error(header.resultMsg)
          }

          return body
        })
        .catch(e => {
          console.log(e)
          throw new FailedToCallAPIError(e.message)
        })
    }

    async getDetailCommon(params: GetDetailCommon.Request): Promise<GetDetailCommon.Response> {
      try {
        console.info('call getDetailCommon function')

        const response = await this.callTourAPI('get', '/detailCommon', {
          ...params,
          mapinfoYN: 'Y',
        })

        return response.items.item
      } catch (e) {
        throw new FailedToCallAPIError(e.message)
      }
    }

    async getDetailImage(params: GetDetailImage.Request): Promise<GetDetailImage.Response> {
      try {
        console.info('call getDetailImage function')

        const response = await this.callTourAPI('get', '/detailImage', {
          ...params,
          imageYN: 'Y',
          subImageYN: 'Y',
        })

        return response
      } catch (e) {
        throw new FailedToCallAPIError(e.message)
      }
    }

    async getDetailInfo(params: GetDetailInfo.Request): Promise<GetDetailInfo.Response> {
      try {
        console.info('call getDetailInfo function')

        const response = await this.callTourAPI('get', '/detailInfo', params)

        return response
      } catch (e) {
        throw new FailedToCallAPIError(e.message)
      }
    }

    async getDetailIntro(params: GetDetailIntro.Request): Promise<GetDetailIntro.Response> {
      try {
        console.info('call getDetailIntro function')

        const response = await this.callTourAPI('get', '/detailIntro', params)

        return response.items.item
      } catch (e) {
        throw new FailedToCallAPIError(e.message)
      }
    }

    async getLocationBasedList(params: GetLocationBasedList.Request): Promise<GetLocationBasedList.Response> {
      try {
        console.info('call getLocationBasedList function')

        const response = await this.callTourAPI('get', '/locationBasedList', {
          ...params,
          listYN: 'Y',
        })

        return response
      } catch (e) {
        throw new FailedToCallAPIError(e.message)
      }
    }
}