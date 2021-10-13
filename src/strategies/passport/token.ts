import { Strategy } from 'passport-accesstoken'

import User from '@/models/user'

let strategyOptions = {
  tokenHeader: 'Authorization',
}

export default new Strategy(strategyOptions, function (token, done) {
  if (!token.startsWith('Bearer ')) {
    return done(null, false)
  }
  token = token.split(' ')[1]
  User.findOne({ accessToken: token })
    .populate('nftList')
    .exec(function (err, user) {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(null, false)
      }

      return done(null, user)
    })
})
