import { Schema, model, Document } from 'mongoose';

interface Nft extends Document {
    contentId: number,  // 관광지 contentid
    nftId: string,
    image: string,      // image link
    title: string,      // 관광지 이름
    weather: string,
    emotion: string,
    impression: string,
    txHash: string,
}

const schema = new Schema<Nft>({
    contentId: { type: Number, required: true },
    nftId: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    weather: { type: String, required: true },
    emotion: { type: String, required: true },
    impression: { type: String, required: true },
    txHash: { type: String, required: true },
});

export default model<Nft>('Nft', schema);
