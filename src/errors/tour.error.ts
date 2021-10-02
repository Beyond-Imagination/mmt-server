import HttpError from '@/errors/http.error'

export class ContentNotFoundError extends HttpError {
    constructor () {
        super(400, '조건에 맞는 항목을 찾지 못했습니다.')
    }
}

export class FailedToCallAPIError extends HttpError {
    constructor(errorMsg) {
        super(500, 'API를 호출하는 데에 실패하였습니다.', errorMsg);
    }
}
