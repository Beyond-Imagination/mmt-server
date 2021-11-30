import {mintNFT} from '@/services'
import {success} from '@/helpers'

const mintNft = async (req, res) => {
  const {user, body} = req

  const nft = await mintNFT(user, body)

  success(res, nft)
}

const uploadImage = async (req, res) => {
  if (!req.file) {
    throw new Error('fail to upload image to s3')
  }

  const image = (req.file as Express.MulterS3.File).location
  const result = {image}

  success(res, result)
}

export default {
  mintNft,
  uploadImage
}