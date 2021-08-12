import 'module-alias/register'

import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'

import routes from '@/routes'
import { errorHandler } from '@/middlewares/error.middleware'

import '@/plugins/passport.plugin'
import '@/plugins/aws.plugin'

const port = process.env.APP_PORT || 3005;
const host = process.env.APP_HOST || 'localhost';

const SESSION_KEY = process.env.SESSION_KEY || 'HELLO_WORLD'

if (!SESSION_KEY) {
  console.error('No session secret string. Set SESSION_KEY environment variable.')
  process.exit(1)
}

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

(() => {
  const app = new App();
  app.init();
  app.start();
})()

export default App
