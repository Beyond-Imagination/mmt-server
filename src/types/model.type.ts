import { Media } from './media.type'

export declare namespace Model {
  interface User {
    userId: string
    userName: string
    completed: boolean
    rules: Array<string>
    auth: string
    password?: string
    profileImage?: Media.ImageInfo
  }
}
