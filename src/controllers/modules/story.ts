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
  await checkIfUserExist(storyService)

  // 동의 내역 확인하기
  await checkIfStoryPublishAgreed(storyService)

  // 이미지 데이터 받아오기
  const { imageUrl } = body
  const imageData = await getImageData(imageUrl)

  // 이미지 업로드 하기
  const imageUrlList = await storyService.uploadImages(imageData)

  // 사진 스토리 쓰기
  await storyService.postPhotoStory(accessToken, imageUrlList) // 올라간 스토리 ID

  return success(res, null)
}

export default {
  index
}

/**
 * 사용자가 카카오스토리 유저인지 확인합니다.
 * @param storyService - StoryService 인스턴스
 */
async function checkIfUserExist(storyService: StoryService) {
  const isStoryUser = await storyService.isStoryUser()
  if (!isStoryUser) {
    throw new NotStoryUserError()
  }
}

/**
 * 사용자가 카카오 스토리 포스팅 작성에 동의하였는지 확인합니다.
 * @param storyService - StoryService 인스턴스
 */
async function checkIfStoryPublishAgreed(storyService: StoryService) {
  const scopes = ['story_publish']
  const {scopes: consent} = await storyService.checkConsent(scopes)
  const isStoryPublishAgreed = consent[0].agreed

  if (!(isStoryPublishAgreed)) {
    throw new NotAgreeToWriteStoryError()
  }
}

/**
 * url을 통해 받아온 이미지 데이터를 binary 형태로 리턴해줍니다.
 * @param imageUrl - 이미지 url
 */
async function getImageData(imageUrl: string) {
  const result = await axios
    .get(imageUrl, {
      responseType: 'arraybuffer'
    })
    .catch(e => {
      throw new FailedToCallAPIError(e.message)
    })

  const Buffer = buffer.Buffer
  const imageData = Buffer.from(result.data)

  return imageData
}