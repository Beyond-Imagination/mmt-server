import passport from 'passport'
import LocalStrategy from '@/strategies/passport/local.passport'
import JwtStrategy from '@/strategies/passport/jwt.passport'
import TokenStrategy from '@/strategies/passport/token'
import { Model } from '@/types/model.type'

passport.use(LocalStrategy)
passport.use(JwtStrategy)
passport.use(TokenStrategy)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser<Model.SampleUser>((user, done) => done(null, user))
