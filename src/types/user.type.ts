export declare namespace User {
  namespace Service {
    namespace GetUserInfo {
      interface Request {
        accessToken: String
      }

      interface Response {
        kakaoUserId: Number
        nickname: String
        profileImageUri: String
      }
    }

    namespace GetAccessToken {
      interface Request {
        code: string
      }
    }
  }
}
