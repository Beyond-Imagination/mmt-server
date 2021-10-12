import { Schema, model, connect, Document, Types } from 'mongoose'

export interface IUser extends Document {
  nickname: string
  kakaoUserId: number
  profileImageUri: string
  klaytnAddress: string
  nftList?: Array<Types.ObjectId>
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
