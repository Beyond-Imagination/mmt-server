import HttpError from '@/errors/http.error'

// KE320
// 동일한 인가 코드를 두 번 이상 사용하거나, 이미 만료된 인가 코드를 사용한 경우, 혹은 인가 코드를 찾을 수 없는 경우

export class KakaoUserAuthorizationCodeExpired extends HttpError {
  constructor(errorMsg) {
    super(
      401,
      '카카오 인가 코드를 사용했거나 두 번 이상 사용하여 만료되었습니다. 새로운 인가 코드로 시도해주세요.',
      errorMsg
    )
  }
}
