import { Schema, model, Document } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

export interface INft extends Document {
    contentId: number,  // 관광지 contentid
    nftId: number,
    image: string,      // image link
    title: string,      // 관광지 이름
    weather: string,
    emotion: string,
    impression: string,
    txHash?: string,
}

const schema = new Schema<INft>({
    contentId: { type: Number, required: true },
    nftId: { type: Number, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    weather: { type: String, required: true },
    emotion: { type: String, required: true },
    impression: { type: String, required: true },
    txHash: { type: String },
});

schema.plugin(autoIncrement.plugin, { model: 'Nft', field: 'nftId' });

export default model<INft>('Nft', schema);
