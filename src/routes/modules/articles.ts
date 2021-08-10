import { Router } from 'express'

import wrapAsync from '@/src/middlewares/async.middleware'
import { success } from '@/src/helpers/response'
import EmptyError from '@/src/errors/empty.error'

const router = Router()

router.get('/success', wrapAsync(
  async (req, res) => {
    success(res, 'Hello World!')
  })
)

router.get('/failed', wrapAsync(
  async (req, res) => {
    throw new EmptyError('hello')
  }
))

export default {
  router,
  name: 'articles'
}
