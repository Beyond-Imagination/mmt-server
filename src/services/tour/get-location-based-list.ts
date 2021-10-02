/**
 * 위치기반 관광정보 조회 오퍼레이션
 */

import axios from "axios";

import {BASE_URL, MOBILE_APP, MOBILE_OS, RADIUS, SUCCESS} from "@/constants";
import {Tour} from "@/types";
import {FailedToCallAPIError} from "@/errors";

import Request = Tour.Service.GetLocationBasedList.Request;
import Response = Tour.Service.GetLocationBasedList.Response;

export async function getLocationBasedList(params: Request): Promise<Response> {
    try {
        const url = `${BASE_URL}/locationBasedList`;

        console.info("call getLocationBasedList function");

        const response = await axios.get(url, {
            params: {
                ...params,
                MobileOS: MOBILE_OS,
                MobileApp: MOBILE_APP,
                ServiceKey: process.env.TOUR_SERVICE_KEY,
                listYN: "Y",
                radius: RADIUS,
            }
        });

        const { data } = response;
        const { header, body } = data.response;

        if (header.resultCode != SUCCESS) {
            throw Error(header.resultMsg);
        }

        return body;
    } catch (e) {
        throw new FailedToCallAPIError(e.message);
    }
}