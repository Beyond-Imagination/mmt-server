import articles from '@/routes/modules/articles'
import auth from '@/routes/modules/auth'
import tour from '@/routes/modules/tour'
import nft from '@/routes/modules/nft'
import users from '@/routes/modules/user'
import dev from '@/routes/modules/dev'
import story from '@/routes/modules/story'

import { Server } from '@/types/server.type'

const routes: Server.IRoute[] = [articles, auth, tour, nft, users, story]

if(process.env.NODE_ENV === 'development') {
  routes.push(dev)
}

export default routes
