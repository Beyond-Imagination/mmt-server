import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import wrapAsync from '@/middlewares/async.middleware'
import User from '@/models/user'
import { success } from '@/helpers/response'
import { Model } from '@/types/model.type'
import { AlreadyUsingUserIdError, NoUserError } from '@/errors/auth.error'
import { ReqParamsNotMatchError } from '@/errors/req.error'
import { generatePassword } from '@/helpers/password'
import { reverseProjection } from '@/helpers/object'
import { authenticateWithJWT, authenticateWithLocal } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/check/:userId', wrapAsync(
  async (req, res) => {
    const { userId } = req.params

    const userInfo = await User.get(userId, {
      attributes: ['userId', 'completed']
    })

    if (!userInfo) {
      throw new NoUserError()
    }

    success(res, userInfo)
  })
)

router.get('/user',
  [authenticateWithJWT],
  wrapAsync(
  async (req, res) => {
    const user = req.user
    if (!user) {
      throw new NoUserError()
    }
    await success(res, reverseProjection(user, ['password']))
  }
))

router.post('/login', [authenticateWithLocal])

router.post('/logout',
  wrapAsync(async (req, res) => {
    if (req.user) {
      req.logout()
    }
    await success(res, null)
  })
)

router.post('/signup', [
  body('userId').exists(),
  body('password').exists(),
  body('userName').exists()
], wrapAsync(
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ReqParamsNotMatchError(errors)
    }

    const { userId, password, userName } = req.body
    const hashedPassword = generatePassword(password)

    const useInfo = await User.get(userId)

    if (useInfo) {
      throw new AlreadyUsingUserIdError(userId)
    }

    const item: Model.User = {
      userId,
      userName,
      rules: ['USER'],
      auth: 'USER',
      password: hashedPassword,
      completed: false
    }

    const user = new User(item)
    const result = await user.save()

    success(res, reverseProjection(result, ['password']))
  }
))

export default {
  name: 'auth',
  router
}
