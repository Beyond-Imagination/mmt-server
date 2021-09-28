import articles from '@/routes/modules/articles'
import auth from '@/routes/modules/auth'
import tour from "@/routes/modules/tour";

import { Server } from '@/types/server.type'

const routes: Server.IRoute[] = [
  articles,
  auth,
  tour
]

export default routes
