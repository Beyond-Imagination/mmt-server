import tour from '@/routes/modules/tour'
import nft from '@/routes/modules/nft'
import users from '@/routes/modules/user'
import dev from '@/routes/modules/dev'
import story from '@/routes/modules/story'

import { Server } from '@/types'
import {env} from '@/env'

const {isDevelopment} = env
const routes: Server.IRoute[] = [tour, nft, users, story]

if (isDevelopment) {
  routes.push(dev)
}

export default routes
