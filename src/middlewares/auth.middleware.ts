import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { NotAuthenticated, NoUserError } from '@/errors/auth.error'
import jwt from 'jsonwebtoken'
import { projection } from '@/helpers/object'
import { success } from '@/helpers/response'

const JWT_SECRET = process.env.JWT_SECRET || 'HELLO_WORLD'

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

export function authenticateWithLocal (req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', { session: true }, (error, user) => {
    if (error) {
      return next(error)
    }
  
    if (!user) {
      return next(new NoUserError())
    }
  
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr)
      }

      const token = jwt.sign(
        projection(user, ['userId', 'auth']),
        JWT_SECRET
      )

      return success(res, token)
    })
  })(req, res, next)
}
