import CaverExtKAS from 'caver-js-ext-kas'
import AWS from 'aws-sdk'
import { v4 as uuid } from 'uuid'

import {env} from '@/env'
import { IUser } from '@/models/user'
import NFT, { INft } from '@/models/nft'
import { API } from '@/types/api.type'

const { kas: { chainId, accessKeyId, secretAccessKey,nftName }, aws: {s3BucketName}} = env

const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)
const s3 = new AWS.S3()

export async function mintNFT(user: IUser, metadata: API.RequestPostNft) {
  let tokenURI = await saveNFTMetadata(metadata)
  let nft = await saveNFT(metadata)
  let txHash = await mint(user, nft, tokenURI)
  await saveTxHash(nft, txHash)
  await saveUserNFT(user, nft)
  return nft
}

async function saveNFTMetadata(metadata: API.RequestPostNft) {
  let data = {
    Bucket: s3BucketName,
    Key: `metadata/${uuid()}.json`,
    Body: Buffer.from(JSON.stringify(metadata)),
    ContentEncoding: 'base64',
    ContentType: 'application/json',
    ACL: 'public-read'
  }

  let result = await s3.upload(data).promise()
  return result.Location
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
