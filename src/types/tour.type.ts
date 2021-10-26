export declare namespace Tour {
    type Arrange = "A" | "B" | "C" | "D" | "E" | "O" | "P" | "Q" | "R" | "S";
    type ContentTypeId = 12 | 14 | 15 | 25 | 28;

    namespace API {
        namespace GetMany {
            interface Request {
                numOfRows?: number; // 한 페이지 결과 수
                pageNo?: number; // 현재 페이지 번호
                arrange?: Arrange; // (A=제목순;B=조회순;C=수정일순; D=생성일순; E=거리순). 대표이미지가 반드시 있는 정렬: (O=제목순; P=조회순; Q=수정일순; R=생성일순;S=거리순)
                contentTypeId?: ContentTypeId; // 관광타입(관광지; 숙박 등) ID
                mapX: number; // X 좌표 (GPS X좌표(WGS84 경도 좌표))
                mapY: number; // Y좌표 (GPS Y좌표(WGS84 위도 좌표))
                radius: number; // 거리 반경(단위:m), Max값 20000m=20Km
            }
            interface Result {
                numOfRows: number,
                pageNo: number,
                totalCount: number,
                arrange?: string,
                items: {
                    contentId: number, // 콘텐츠ID
                    contentTypeId: number, // 관광타입(관광지, 숙박 등) ID
                    imageUrl?: string, // 썸네일 이미지 주소 (약 160\*100 size)
                    title: string, // 콘텐츠 제목
                    overview?: string // 콘텐츠 개요
                }[] | []
            }
        }
        namespace GetOne {
            interface Request {
                id: number, // params :ID
                contentTypeId: number, // query :ID
            }
            interface Result {
                contentId: number, // 콘텐츠 ID
                contentTypeId: number, // 관광타입(관광지, 숙박 등) ID
                title: string, // 콘텐츠명(제목)
                overview?: string, // 콘텐츠 개요
                images: {
                    imgName?: string // 이미지명
                    originImgUrl? : string // 원본 이미지
                    smallImgUrl? : string // 썸네일 이미지
                }[] | [], // 이미지
                normalInfo: {title: string, content: string}[] | [], // 기본 정보
                infoInfo: {title: string, content: string}[] | [], // 소개 정보
                detailInfo: {title: string, content: string}[] | [] // 상세 정보
            }
        }
    }

    namespace Service {
        namespace GetDetailCommon {
            interface Request {
                numOfRows?: number; // 한 페이지 결과 수
                pageNo?: number; // 페이지 번호
                contentId: number; // 콘텐츠 ID
                contentTypeId?: ContentTypeId; // 관광타입 ID
                defaultYN?: "Y" | "N"; // 기본정보 조회
                firstImageYN?: "Y" | "N"; // 대표이미지 조회
                areaCodeYN?: "Y" | "N"; // 지역코드 조회
                catCodeYN?: "Y" | "N"; // 서비스분류코드 조회
                addrInfoYN?: "Y" | "N"; // 주소 조회
                overviewYN?: "Y" | "N"; // 개요 조회
            }
            interface Response {
                contentid: number // 콘텐츠ID
                contenttypeid: ContentTypeId // 콘텐츠타입ID

                // defaultYN=Y (기본정보 조회)
                booktour?: boolean // 교과서 여행지 여부
                createdtime: number // 등록일
                homepage?: string // 홈페이지 주소
                modifiedtime: number // 수정일
                tel?: string // 전화번호
                telname?: string // 전화번호명
                title: string // 콘텐츠명(제목)

                // firstImageYN=Y (대표이미지 조회)
                firstimage?: string // 대표이미지(원본)
                firstimage2?: string // 대표이미지(썸네일)

                // areacodeYN=Y (지역정보 조회)
                areacode?: number // 지역코드
                sigungucode?: number // 시군구코드

                // catcodeYN=Y (분류코드 조회)
                cat1?: number // 대분류
                cat2?: number // 중분류
                cat3?: number // 소분류

                // addrinfoYN=Y (주소정보 조회)
                addr1?: string // 주소
                addr2?: string // 상세주소
                zipcode?: number // 우편번호

                // mapinfoYN=Y (좌표정보 조회)
                mapx?: number // GPS X좌표
                mapy?: number // GPS Y좌표
                mlevel?: number // Map Level

                // overviewYN=Y
                overview?: string // 개요
            }
        }

        namespace GetDetailImage {
            interface Request {
                numOfRows?: number; // 한 페이지 결과 수
                pageNo?: number; // 페이지 번호
                contentId: number; // 콘텐츠 ID
                imageYN?: "Y" | "N"; // Y=콘텐츠 이미지 조회
                                     // N=”음식점”타입의 음식메뉴 이미지
                subImageYN?: "Y" | "N"; // Y=원본;썸네일 이미지 조회
                                        // N=Null
            }
            interface Response {
                numOfRows: number // 한 페이지 결과 수
                pageNo: number // 페이지 번호
                totalCount: number // 전체 결과 수
                items: {
                    item: Image | Image[]
                }
            }
            interface Image {
                contentid: number // 콘텐츠ID
                imgname? : string // 이미지명
                originimgurl? : string // 원본 이미지
                serialnum? : string // 이미지 일련번호
                smallimageurl? : string // 썸네일 이미지
            }
        }

        namespace GetDetailInfo {
            interface Request {
                numOfRows?: number; // 한 페이지 결과 수
                pageNo?: number; // 페이지 번호
                contentId: number; // 콘텐츠 ID
                contentTypeId: ContentTypeId; // 관광타입 ID
            }
            interface Response {
                numOfRows: number // 한 페이지 결과 수
                pageNo: number // 페이지 번호
                totalCount: number // 전체 결과 수
                items: {
                    item: {
                        contentid: number // 콘텐츠ID
                        contenttypeid: ContentTypeId // 콘텐츠타입ID

                        // 숙박, 여행코스를 제외한 타입
                        fldgubun?: number // 일련번호
                        infoname?: string // 제목
                        infotext?: string // 내용
                        serialnum?: number // 반복 일련번호

                        // contentTypeId=25 (여행코스)
                        subcontentid?: number // 하위 콘텐츠ID
                        subdetailalt?: string // 코스이미지 설명
                        subdetailimg?: string // 코스이미지
                        subdetailoverview?: string // 코스개요
                        subname?: string // 코스명
                        subnum?: number // 반복 일련번호
                    }[]
                }
            }
        }

        namespace GetDetailIntro {
            interface Request {
                numOfRows?: number; // 한 페이지 결과 수
                pageNo?: number; // 페이지 번호
                contentId: number; // 콘텐츠 ID
                contentTypeId: ContentTypeId; // 관광타입 ID
            }
            interface Response {
                numOfRows: number // 한 페이지 결과 수
                pageNo: number // 페이지 번호
                totalCount: number // 전체 결과 수
                contentid: number // 콘텐츠ID
                contenttypeid: ContentTypeId // 콘텐츠타입ID

                // contentTypeId=12 (관광지)
                accomcount: string // 수용인원
                chkbabycarriage?: string // 유모차대여 정보
                chkcreditcard?: string // 신용카드가능 정보
                chkpet?: string // 애완동물동반가능 정보
                expagerange?: string // 체험가능 연령
                expguide?: string // 체험안내
                heritage1?: boolean // 세계 문화유산 유무
                heritage2?: boolean // 세계 자연유산 유무
                heritage3?: boolean // 세계 기록유산 유무
                infocenter?: string // 문의 및 안내
                opendate?: string // 개장일
                parking?: string // 주차시설
                restdate?: string // 쉬는날
                useseason?: string // 이용시기
                usetime?: string // 이용시간

                // contentTypeId=14 (문화시설)
                accomcountculture?: string // 수용인원
                chkbabycarriageculture?: string // 유모차대여 정보
                chkcreditcardculture?: string // 신용카드가능 정보
                chkpetculture?: string // 애완동물동반가능 정보
                discountinfo?: string // 할인정보
                infocenterculture?: string // 문의 및 안내
                parkingculture?: string // 주차시설
                parkingfee?: string // 주차요금
                restdateculture?: string // 쉬는날
                usefee?: string // 이용요금
                usetimeculture?: string // 이용시간
                scale?: string // 규모
                spendtime?: string // 관람 소요시간

                // contentTypeId=15 (행사/공연/축제)
                agelimit?: string // 관람 가능연령
                bookingplace?: string // 예매처
                discountinfofestival?: string // 할인정보
                eventenddate?: string // 행사 종료일
                eventhomepage?: string // 행사 홈페이지
                eventplace?: string // 행사 장소
                eventstartdate?: string // 행사 시작일
                festivalgrade?: string // 축제등급
                placeinfo?: string // 행사장 위치안내
                playtime?: string // 공연시간
                program?: string // 행사 프로그램
                spendtimefestival?: string // 관람 소요시간
                sponsor1?: string // 주최자 정보
                sponsor1tel?: string // 주최자 연락처
                sponsor2?: string // 주관사 정보
                sponsor2tel?: string // 주관사 연락처
                subevent?: string // 부대행사
                usetimefestival?: string // 이용요금

                // contentTypeId=25 (여행코스)
                distance?: string // 코스 총거리
                infocentertourcourse?: string // 문의 및 안내
                schedule?: string // 코스 일정
                taketime?: string // 코스 총 소요시간
                theme?: string // 코스 테마

                // contentTypeId=28 (레포츠)
                accomcountleports?: string // 수용인원
                chkbabycarriageleports?: string // 유모차대여 정보
                chkcreditcardleports?: string // 신용카드가능 정보
                chkpetleports?: string // 애완동물동반가능 정보
                expagerangeleports?: string // 체험 가능연령
                infocenterleports?: string // 문의 및 안내
                openperiod?: string // 개장기간
                parkingfeeleports?: string // 주차요금
                parkingleports?: string // 주차시설
                reservation?: string // 예약안내
                restdateleports?: string // 쉬는날
                scaleleports?: string // 규모
                usefeeleports?: string // 입장료
                usetimeleports?: string // 이용시간
            }
        }

        namespace GetLocationBasedList {
            interface Request {
                numOfRows?: string; // 한 페이지 결과 수
                pageNo?: string; // 현재 페이지 번호
                arrange?: Arrange; // (A=제목순;B=조회순;C=수정일순; D=생성일순; E=거리순). 대표이미지가 반드시 있는 정렬: (O=제목순; P=조회순; Q=수정일순; R=생성일순;S=거리순)
                contentTypeId?: string; // 관광타입(관광지; 숙박 등) ID
                mapX: string; // X 좌표 (GPS X좌표(WGS84 경도 좌표))
                mapY: string; // Y좌표 (GPS Y좌표(WGS84 위도 좌표))
                radius: string; // 거리 반경(단위:m), Max값 20000m=20Km
            }
            interface Response {
                numOfRows: number // 한 페이지 결과 수
                pageNo: number // 페이지 번호
                totalCount: number // 전체 결과 수
                items: {
                    item: {
                        addr1?: string // 주소
                        addr2?: string // 상세주소
                        areacode?: number // 지역코드
                        booktour?: boolean // 교과서 속 여행지 여부
                        cat1?: string // 대분류
                        cat2?: string // 중분류
                        cat3?: string // 소분류
                        contentid: number // 콘텐츠ID
                        contenttypeid: ContentTypeId // 콘텐츠타입ID
                        createdtime: number // 등록일
                        dist: number // 거리
                        firstimage?: string // 대표이미지(원본)
                        firstimage2?: string // 대표이미지(썸네일)
                        mapx?: number // GPS X좌표
                        mapy?: number // GPS Y좌표
                        mlevel?: number // Map Level
                        modifiedtime: number // 수정일
                        readcount?: number // 조회수
                        sigungucode?: number // 시군구코드
                        tel?: string // 전화번호
                        title: string // 제목
                    }[]
                }
            }
        }
    }
}