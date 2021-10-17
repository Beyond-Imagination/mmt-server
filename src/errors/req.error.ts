import { Result, ValidationError } from 'express-validator'
import HttpError from '@/errors/http.error'

const defaultMessage = 'Invalid value';

export class ReqParamsNotMatchError extends HttpError {
  constructor (validationError: Result<ValidationError>) {
    const messages = validationError.array().map(error => {
      if (error.msg == defaultMessage) {
        return `파라미터 [${error.param}]: 반드시 필요합니다.`
      } else {
        return `파라미터 [${error.param}]: ${error.msg}`
      }
    }).join(' ');

    super(400, messages)
  }
}
