import express from 'express'
import 'module-alias/register'

import routes from '~/src/routes'
import { errorHandler } from '@/src/middlewares/error.middleware'

const port = process.env.APP_PORT || 3005;
const host = process.env.APP_HOST || 'localhost';

class App {
  private app : express.Application;
  constructor () {
    this.app = express();
  }

  public init (): void {
    const { app } = this
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
