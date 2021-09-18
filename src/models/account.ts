import { Schema, model, connect, Document, Types } from 'mongoose';

interface Account extends Document {
    name: string;
    profile: string;
    klaytnAddres: string;
    nft: Array<Types.ObjectId>;
    accessToken: string;
}

const schema = new Schema<Account>({
    name: { type: String, required: true },
    profile: { type: String, required: true },
    klaytnAddres: String,
    nft: [{ type: Schema.Types.ObjectId }],
    accessToken: String,
});

export default model<Account>('Account', schema);
