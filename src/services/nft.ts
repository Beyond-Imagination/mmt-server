import CaverExtKAS from 'caver-js-ext-kas'

import User, { IUser } from '@/models/user'
import NFT, { INft } from '@/models/nft'
import { API } from '@/types/api.type'

const chainId = process.env.KAS_CHAIN_ID;
const accessKeyId = process.env.KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
const nftName = process.env.NFT_NAME;

const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)

export async function mintNFT(user: IUser, metadata: API.RequestPostNft) {
  try {
    let tokenURI = await saveNFTMetadata(metadata)
    let nft = await saveNFT(metadata)
    let txHash = await mint(user, nft, tokenURI)
    await saveTxHash(nft, txHash)
    await saveUserNFT(user, nft)
    return nft
  } catch (e) {
    throw e
  }
}

async function saveNFTMetadata(metadata: API.RequestPostNft) {
  // 추후 필요할시 구현. 현재는 임의의 링크 return
  let tempMetadata = 'https://link.to.your/token/metadata-0x1.json'
  return tempMetadata
}

async function saveNFT(metadata: API.RequestPostNft) {
  try {
    let nft = await NFT.create(metadata)
    console.log('successfully saved nft to db')
    return nft
  } catch (e) {
    console.error('fail to save nft', e)
    throw e
  }
}

async function mint(user: IUser, nft: INft, nftURI: string) {
  try {
    let response = await caver.kas.kip17.mint(nftName, user.klaytnAddress, nft.nftId, nftURI)
    console.log('mint nft requestd', user, nft, nftURI, response)
    return response.transactionHash
  } catch (e) {
    console.error('fail to mint nft', e)
    throw e
  }
}

async function saveTxHash(nft: INft, txHash: string) {
  nft.txHash = txHash
  await nft.save()
}

async function saveUserNFT(user: IUser, nft: INft) {
  user.nftList.push(nft._id)
  await user.save()
}

export async function saveImage() {}
