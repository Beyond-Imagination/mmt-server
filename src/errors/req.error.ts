import { Result, ValidationError } from 'express-validator'
import HttpError from '@/errors/http.error'

export class ReqParamsNotMatchError extends HttpError {
  constructor (validationError: Result<ValidationError>) {
    const parameters = validationError.array().map(error => error.param).join(', ')
    const message = `파라미터 [${parameters}] 는 반드시 필요합니다.`
    super(400, message)
  }
}
