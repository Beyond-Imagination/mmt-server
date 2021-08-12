import { Router } from 'express'
import { param, validationResult } from 'express-validator'

import wrapAsync from '@/middlewares/async.middleware'
import { success } from '@/helpers/response'
import { ReqParamsNotMatchError } from '@/errors/req.error'

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
      throw new ReqParamsNotMatchError(errors)
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
