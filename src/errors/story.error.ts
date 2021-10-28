import HttpError from '@/errors/http.error'

export class NotStoryUserError extends HttpError {
  constructor () {
    super(400, '카카오 스토리 유저가 아닙니다.')
  }
}

export class NotAgreeToWriteStoryError extends HttpError {
  constructor () {
    super(400, '카카오 스토리 작성 동의를 하지 않았습니다.')
  }
}