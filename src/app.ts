import 'module-alias/register'

import express from 'express'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'

// 환경 변수를 사용 하는 곳보다 먼저 선언 되어야 합니다.
import {envLoader} from '@/loaders'
envLoader()

import {env} from '@/env'
import routes from '@/routes'
import models from '@/models'
import {errorHandler, FileStreamAll, FileStreamOnlyError, limiter, StdOut} from '@/middlewares'

import '@/plugins/passport.plugin'
import '@/plugins/aws.plugin'

const { port, host, allowedOrigin, sessionKey } = env

class App {
  private app : express.Application;
  constructor () {
    this.app = express()
  }

  public init (): void {
    const { app } = this

    app.set('trust proxy', true) // 정확한 remote address 추적을 위함
    app.use(express.json())
    let corsOption = {
      origin: allowedOrigin,
    }
    app.use(cors(corsOption))
    app.use(session({
      secret: sessionKey,
      resave: false,
      saveUninitialized: false
    }))

    //  Passport
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
  }
  
  public start (): void {
    this.app.listen(port, () => console.log(`Application running on ${host}:${port}`))
  }
}

(async () => {
  const app = new App()
  await models.connect()
  app.init()
  app.start()
})()

export default App
