import 'module-alias/register'
import '@/loaders/env' // 환경 변수를 쓰는 곳보다 상단에 위치해야 합니다.

import {awsLoader, expressLoader, mongooseLoader, passportLoader} from '@/loaders'
import {env} from '@/env'

const { port, host } = env;

(async () => {
  await mongooseLoader()
  passportLoader()
  awsLoader()
  const app = expressLoader()

  app.listen(port, () => console.log(`Application running on ${host}:${port}`))
})()
  .then(() => console.info('Application load success'))
  .catch(e => console.error('Application is crashed\n' + e))