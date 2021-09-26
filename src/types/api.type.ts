export declare namespace API {
  export interface Response {
    message: string | null
    success: boolean
    status: number
    result: any
  }

  export interface RequestPostNft {
    contentId: number
    title: string
    weather: string
    emotion: string
    impression: string
    image: string
  }
}
