import 'module-alias/register'

import express from 'express'
import passport from 'passport'
import session from 'express-session'
import 'dotenv/config'

// 환경 변수를 사용 하는 곳보다 먼저 선언 되어야 합니다.
import { configLoader } from "@/configs";
const config = configLoader();

import routes from '@/routes'
import models from '@/models'
import {errorHandler, FileStreamAll, FileStreamOnlyError, StdOut} from '@/middlewares'

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

    app.set('trust proxy', true); // 정확한 remote address 추적을 위함
    app.use(express.json())
    app.use(session({
      secret: SESSION_KEY,
      resave: false,
      saveUninitialized: false
    }))

    //  Passport
    app.use(passport.initialize())
    app.use(passport.session())

    // Morgan
    app.use(StdOut());
    app.use(FileStreamAll());
    app.use(FileStreamOnlyError());

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
