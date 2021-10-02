/**
 * 소개 정보 조회 오퍼레이션
 */

import axios from "axios";

import {BASE_URL, MOBILE_APP, MOBILE_OS, SUCCESS} from "@/constants";
import {Tour} from "@/types";
import {FailedToCallAPIError} from "@/errors";

import Response = Tour.Service.GetDetailIntro.Response;
import Request = Tour.Service.GetDetailIntro.Request;

export async function getDetailIntro(params: Request): Promise<Response> {
    try {
        const url = `${BASE_URL}/detailIntro`;

        console.info("call getDetailIntro function");

        const response = await axios.get(url, {
            params: {
                ...params,
                MobileOS: MOBILE_OS,
                MobileApp: MOBILE_APP,
                ServiceKey: process.env.TOUR_SERVICE_KEY,
            },
        });

        const {data} = response;
        const {header, body} = data.response;

        if (header.resultCode != SUCCESS) {
            throw Error(header.resultMsg);
        }

        return body.items.item;
    } catch (e) {
        throw new FailedToCallAPIError(e.message);
    }
}