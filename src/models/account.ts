import { Schema, model, connect, Document, Types } from 'mongoose';

export interface IAccount extends Document {
    name: string;
    profile: string;
    klaytnAddress: string;
    nft?: Array<Types.ObjectId>;
    accessToken: string;
}

const schema = new Schema<IAccount>({
    name: { type: String, required: true },
    profile: { type: String, required: true },
    klaytnAddress: String,
    nft: [{ type: Schema.Types.ObjectId }],
    accessToken: String,
});

export default model<IAccount>('Account', schema);
