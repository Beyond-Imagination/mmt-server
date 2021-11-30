
# mmt-server

## Introduction

**Moment, 세상에 하나뿐인 나만의 특별한 여행 지도** 프로젝트의 백엔드 repository 입니다. 

API 문서 관리는 Postman, issue/코드 관리는 Jetbrain Space를 사용합니다.

### API

| API 종류 | HTTP Method |        기능        |       url      |                                          설명                                          |
|:--------:|:--------:|:------------------:|:-------------------:|:--------------------------------------------------------------------------------------:|
| User API |   POST   |  회원 가입, 로그인 |        /oauth       | 회원 정보 사용 동의 화면은 카카오톡 App 전환 혹은 팝업을 노출하는 방식으로 FE에서 처리 |
|          |  DELETE  |    회원 로그아웃   |      /users/out     | 로그아웃 API는 회원의 액세스 토큰과 Refresh 토큰을 모두 만료                           |
|          |  DELETE  |      회원 탈퇴     |     /users/leave    | 회원 탈퇴는 로그아웃과 더불어 Moment 서비스와 카카오 계정 사이 Connection을 끊음       |
|          |   POST   |   Klip 주소 연동   | /user/klaytnAddress | FE에서 Klip A2A API로 유저의 Klaytn 주소를 받은 후 해당 API로 DB에 저장                |
|          |   GET    |      회원 정보     |        /user        | 유저 정보를 반환                                                                       |
|  NFT API |   POST   |      NFT 발급      |         /nft        | NFT발급을 위한 API로 NFT에 필요한 정보들을 보내면 NFT를 발급                           |
|          |   POST   |     사진 업로드    |      /nft/image     | NFT로 저장할 이미지 업로드                                                             |
| Tour API |   GET    |  관광지 목록 조회  |        /tour        | 관광지 목록 조회                                                                       |
|          |   GET    | 관광지 detail 조회 |      /tour/:ID      | 관광지 상세 화면 조회                                                                  |
|  Kakao API |   POST   | 카카오 스토리 공유 |     /story/post     | 발급받은 NFT로 카카오 스토리 게시물 작성                                               |

## Project Stack

* Amazon Lightsail
* Amazon S3
* Express
* Typescript
* Mongoose

<img src='https://i.ibb.co/vqvqFhq/2021-12-01-5-15-08.png' title="Github_Logo"/>

## Usage

1. 환경변수 파일 설정
   1. 루트 디렉토리 내 **env/.env** 파일을 생성
   1. **env/.env.sample** 파일 내용을 **env/.env**에 붙여넣고 값을 채웁니다.
   
1. 실행
    ```
    yarn dev # or npm run dev
    ```
   