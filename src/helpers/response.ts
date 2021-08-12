import { Response } from 'express'
import { API } from '@/types/api.type'

export function success (res: Response, result: any) {
  const item: API.Response = {
    status: 200,
    success: true,
    message: 'success',
    result
  }

  return res.status(200).json(item)
}

const defaultErrorItem: API.Response = {
  status: 400,
  success: false,
  result: null,
  message: 'Error'
}

export function failed (res: Response, errorResponse: Partial<API.Response>) {
  const item: API.Response = {
    ...defaultErrorItem,
    ...errorResponse
  }

  return res.status(item.status).json(item)
}
