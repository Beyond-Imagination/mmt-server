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

  success(res, {'image': (req.file as Express.MulterS3.File).location})
}

export default {
  mintNft,
  uploadImage
}