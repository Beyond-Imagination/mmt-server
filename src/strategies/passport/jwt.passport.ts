import { ExtractJwt, Strategy } from 'passport-jwt'
import { Model } from '@/types/model.type'
import User from '@/models/sampleuser'

const JWT_SECRET = process.env.JWT_SECRET

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
}

const JwtStrategy = new Strategy(JWTConfig, async (jwtPayload, done) => {
  let userInfo: Model.SampleUser | null = null

  try {
    userInfo = await User.get(jwtPayload.userId)
  } catch (e) {
    return done(null, null, { message: '올바르지 않은 인증정보입니다.' })
  }

  return done(null, userInfo)
})

export default JwtStrategy
