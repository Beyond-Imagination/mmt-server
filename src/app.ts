import 'module-alias/register'

import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
import 'dotenv/config'

import routes from '@/routes'
import models from '@/models'
import { errorHandler } from '@/middlewares/error.middleware'
import { configLoader } from "@/configs";

// 환경 변수를 사용 하는 곳보다 먼저 선언 되어야 합니다.
const config = configLoader();

import '@/plugins/passport.plugin'
import '@/plugins/aws.plugin'

const { APP_PORT: port, APP_HOST: host, SESSION_KEY } = config;

class App {
  private app : express.Application;
  constructor () {
    this.app = express();
  }

  public init (): void {
    const { app } = this
    app.use(express.json())
    app.use(morgan('dev'))
    app.use(session({
      secret: SESSION_KEY,
      resave: false,
      saveUninitialized: false
    }))
  
    //  Passport
    app.use(passport.initialize())
    app.use(passport.session())

    // add routes
    routes.forEach((route) => app.use(`/api/${route.name}`, route.router))
  
    app.use(errorHandler)
  }
  
  public start (): void {
    this.app.listen(port, () => console.log(`Application running on ${host}:${port}`));
  }
}

(async () => {
  const app = new App();
  await models.connect();
  app.init();
  app.start();
})()

export default App
