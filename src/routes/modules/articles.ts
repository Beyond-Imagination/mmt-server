import { Router } from 'express'
import { param, validationResult } from 'express-validator'

import wrapAsync from '@/src/middlewares/async.middleware'
import { success } from '@/src/helpers/response'
import EmptyError from '@/src/errors/empty.error'
import ParamsError from '@/src/errors/params.error'

const router = Router()

router.get('/', wrapAsync(
  async (req, res) => {
    success(res, [])
  })
)

router.get('/:id',
  param('id').exists(),
  wrapAsync(
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ParamsError(errors)
    }
    
    const { id } = req.params
    
    success(res, {
      title: 'Hello World!',
      text: 'Hello World',
      id
    })
  }
))

export default {
  router,
  name: 'articles'
}
