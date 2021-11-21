import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cors from 'cors'

import routes from '@/routes'
import {env} from '@/env'
import {errorHandler, FileStreamAll, FileStreamOnlyError, limiter, StdOut} from '@/middlewares'

const {allowedOrigin, sessionKey} = env

export const expressLoader = (): express.Application => {
  const app = express()

  app.set('trust proxy', true) // 정확한 remote address 추적을 위함
  app.use(express.json())

  const corsOption = {
    origin: allowedOrigin,
  }
  app.use(cors(corsOption))
  app.use(session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false
  }))

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // Morgan
  app.use(StdOut())
  app.use(FileStreamAll())
  app.use(FileStreamOnlyError())

  // Express Rate Limit
  // apply to all requests
  app.use(limiter)

  // add routes
  routes.forEach((route) => app.use(`/api/${route.name}`, route.router))

  app.use(errorHandler)

  console.info('express loaded')

  return app
}
