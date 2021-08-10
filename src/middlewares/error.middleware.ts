import { Request, Response, NextFunction } from 'express'
import HttpError from '~/src/errors/http.error'
import { API } from '~/types/api.type'

export const errorHandler = (
  error: HttpError,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || error.status || 500
  const json: API.Response = {
    status,
    message: error.message,
    success: false,
    result: null
  }
  response.status(status).json(json)
}
