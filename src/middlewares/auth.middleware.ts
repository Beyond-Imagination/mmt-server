import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { NotAuthenticated } from '@/errors/auth.error'

export function isAuthenticated (req: Request, _res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next()
  }

  return next(new NotAuthenticated())
}

export function authenticateWithJWT (req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: true }, (error, user) => {
    if (error) {
      next(error)
    }

    if (user) {
      req.user = user
    }

    next()
  })(req, res, next)
}
