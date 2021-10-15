import { Schema, model, connect, Document, Types } from 'mongoose'

import { INft } from './nft'

export interface IUser extends Document {
  nickname: string
  kakaoUserId: number
  profileImageUri: string
  klaytnAddress: string
  nftList?: Array<Types.ObjectId> | Array<INft>
  accessToken: string
}

const schema = new Schema<IUser>({
  nickname: { type: String, required: true },
  kakaoUserId: { type: Number, required: true },
  profileImageUri: { type: String, required: true },
  klaytnAddress: String,
  nftList: [{ type: Schema.Types.ObjectId, ref: 'Nft' }],
  accessToken: String,
})

export default model<IUser>('User', schema)
