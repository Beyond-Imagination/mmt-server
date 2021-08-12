import { Strategy } from 'passport-local'

import { comparePassword } from '@/helpers/password'
import { Model } from '@/types/model.type'

import User from '@/models/user'

const LocalStrategy = new Strategy({
  usernameField: 'userId',
  passwordField: 'password'
}, async (userId, password, done) => {
  let userInfo: Model.User | null = null

  try {
    userInfo = await User.get(userId)
  } catch (e) {
    return done(null, null, { message: 'internal server error' })
  }

  if (!userInfo) {
    return done(null, null, { message: '유저정보를 찾을 수 없습니다.' })
  }

  if (!comparePassword(password, userInfo.password || '')) {
    return done(null, null, { message: '올바르지 않은 비밀번호 입니다.' })
  }

  return done(null, {
    userId: userInfo.userId,
    userName: userInfo.userName,
    completed: userInfo.completed,
    profileImage: userInfo.profileImage
  }, { message: 'login success' })
})

export default LocalStrategy
