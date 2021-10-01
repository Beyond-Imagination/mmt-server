import CaverExtKAS from 'caver-js-ext-kas';

import Account, {IAccount} from '@/models/account';
import NFT, {INft} from '@/models/nft';
import { API } from '@/types/api.type';

// TODO:TOURISM-KAKAO-T-68 set config
const chainId = 1001;
const accessKeyId = "KASK7995ABW9CQJW26XL0ZJR";
const secretAccessKey = "rhklZ-uzRD0Af99QNsGxTYs8h59MBJE_2dh8lbCt";
const contractAddress = "0x607e9849631a8254dc9a4f0aeb401e3244de617b";

const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

export async function mintNFT(user:IAccount, metadata:API.RequestPostNft) {
    try{
        let tokenURI = await saveNFTMetadata(metadata);
        let nft = await saveNFT(metadata);
        nft.txHash = await mint(user, nft, tokenURI);
        await saveTxHash(nft);
        return nft;
    } catch(e) {
        throw e;
    }
}

async function saveNFTMetadata(metadata:API.RequestPostNft) {
    // 추후 필요할시 구현. 현재는 임의의 링크 return
    let tempMetadata = "https://link.to.your/token/metadata-0x1.json";
    return tempMetadata;
}

async function saveNFT(metadata:API.RequestPostNft) {
    try {
        let nft = await NFT.create(metadata);
        console.log("successfully saved nft to db");
        return nft;
    } catch(e) {
        console.error("fail to save nft", e);
        throw e;
    }
}

async function mint(user:IAccount, nft:INft, nftURI:string) {
    try{
        let response = await caver.kas.kip17.mint('moment', user.klaytnAddress, nft.nftId, nftURI);
        console.log("mint nft requestd", user, nft, nftURI, response);
        return response.transactionHash;
        
    } catch(e) {
        console.error("fail to mint nft", e);
        throw e;
    }
}

async function saveTxHash(nft:INft) {
    // TODO:TOURISM-KAKAO-T-69 save txHash
}

export async function saveImage() {
    
}
