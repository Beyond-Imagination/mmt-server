import passport from 'passport'
import { Router } from 'express'
import {body} from 'express-validator'

import {camelBody, wrapAsync} from '@/middlewares'
import {StoryController} from '@/controllers'

const router = Router()

router.post('/post',
  passport.authenticate('token'),
  body('image_url').exists().isString(),
  camelBody,
  wrapAsync(StoryController.index)
)

export default {
  name: 'story',
  router
}
