export declare namespace User {
  namespace Service {
    namespace GetUserInfo {
      interface UserModel {
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
