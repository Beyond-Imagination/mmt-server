import {Request, Response} from 'express'
import axios from 'axios'
import buffer from 'buffer'

import {FailedToCallAPIError, NotAgreeToWriteStoryError, NotStoryUserError} from '@/errors'
import {success} from '@/helpers'
import {StoryService} from '@/services'

const index = async (req: Request, res: Response) => {
  const body = req.body

  const accessToken = req.get('Authorization')
  const storyService = new StoryService(accessToken)

  // 사용자 확인
  const {isStoryUser: isSU} = await storyService.isStoryUser()
  if (!isSU) {
    throw new NotStoryUserError()
  }

  // 동의 내역 확인하기
  const scopes = ['story_publish']
  const {scopes: consent} = await storyService.checkConsent(scopes)
  const isStoryPublishAgreed = consent[0].agreed

  if (!(isStoryPublishAgreed)) {
    throw new NotAgreeToWriteStoryError()
  }

  const { imageUrl } = body

  const result = await axios
    .get(imageUrl, {
      responseType: 'arraybuffer'
    })
    .catch(e => {
      throw new FailedToCallAPIError(e.message)
    })
  const Buffer = buffer.Buffer
  const imageData = Buffer.from(result.data)

  // 이미지 업로드 하기
  const imageUrlList = await storyService.uploadImages(imageData)

  // 사진 스토리 쓰기
  await storyService.postPhotoStory(accessToken, imageUrlList) // 올라간 스토리 ID

  return success(res, null)
}

export default {
  index
}