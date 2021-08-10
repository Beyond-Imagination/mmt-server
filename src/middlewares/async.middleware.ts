import { Request, Response, NextFunction } from 'express'

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise <any>

export default function wrapAsync (fn: AsyncFunction) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next)
  }
}
