import articles from '@/routes/modules/articles'
import auth from '@/routes/modules/auth'
import tour from "@/routes/modules/tour";
import nft from '@/routes/modules/nft';

import { Server } from '@/types/server.type'

const routes: Server.IRoute[] = [
  articles,
  auth,
  tour,
  nft,
]

export default routes
