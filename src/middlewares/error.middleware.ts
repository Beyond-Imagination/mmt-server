import { Request, Response, NextFunction } from 'express'
import HttpError from '@/errors/http.error'
import { API } from '@/types/api.type'
import { failed } from '@/helpers/response'

export const errorHandler = (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || error.status || 500
  const item: API.Response = {
    status,
    message: error.message,
    success: false,
    result: null
  }
  
  failed(res, item)
}
