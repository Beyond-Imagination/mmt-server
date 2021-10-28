import passport from 'passport'
import { Router } from 'express'
import axios from 'axios'
import {body} from 'express-validator'
import buffer from 'buffer'
const Buffer = buffer.Buffer

import {camelBody, wrapAsync} from '@/middlewares'
import {checkConsent, isStoryUser, postPhotoStory, uploadImages} from '@/services'
import {success} from '@/helpers'
import {NotAgreeToWriteStoryError, NotStoryUserError} from '@/errors'

const router = Router()

router.post('/post',
  passport.authenticate('token'),
  body('image_url').exists().isString(),
  camelBody,
  wrapAsync(
    async (req, res, next) => {
      const body = req.body

      const accessToken = req.get('Authorization')

      // 사용자 확인
      const {isStoryUser: isSU} = await isStoryUser(accessToken)
      if (!isSU) {
        throw new NotStoryUserError()
      }

      // 동의 내역 확인하기
      const scopes = ['story_publish']
      const {scopes: consent} = await checkConsent(accessToken, scopes)
      const isStoryPublishAgreed = consent[0].agreed

      if (!(isStoryPublishAgreed)) {
        throw new NotAgreeToWriteStoryError()
      }

      const { imageUrl } = body
      const data = axios
        .get(imageUrl, {
          responseType: 'arraybuffer'
        })
        .then(res => {
          return Buffer.from(res.data)
        })

      // 이미지 업로드 하기
      const imageUrlList = await uploadImages(accessToken, data)

      // 사진 스토리 쓰기
      await postPhotoStory(accessToken, imageUrlList) // 올라간 스토리 ID

      return success(res, null)
    }
  )
)

export default {
  name: 'story',
  router
}
