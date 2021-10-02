/**
 * 이미지 정보 조회 오퍼레이션
 */

import axios from 'axios';

import {BASE_URL, MOBILE_APP, MOBILE_OS, SUCCESS} from "@/constants";
import {Tour} from "@/types";
import {FailedToCallAPIError} from "@/errors";

import Response = Tour.Service.GetDetailImage.Response;
import Request = Tour.Service.GetDetailImage.Request;

export async function getDetailImage(params: Request): Promise<Response> {
    try {
        const url = `${BASE_URL}/detailImage`;

        console.info("call getDetailImage function");

        const response = await axios.get(url, {
            params: {
                ...params,
                MobileOS: MOBILE_OS,
                MobileApp: MOBILE_APP,
                ServiceKey: process.env.TOUR_SERVICE_KEY,
                imageYN: "Y",
                subImageYN: "Y",
            },
        });

        const {data} = response;
        const {header, body} = data.response;

        if (header.resultCode != SUCCESS) {
            throw Error(header.resultMsg);
        }

        return body;
    } catch (e) {
        throw new FailedToCallAPIError(e.message);
    }
}
