import articles from '@/routes/modules/articles'
import auth from '@/routes/modules/auth'

import { Server } from '@/types/server.type'

const routes: Server.IRoute[] = [
  articles,
  auth
]

export default routes
