const rateLimit = require('express-rate-limit')
import {env} from '@/env'

const {maxRequest} = env

export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // // 10 minutes
  max: +(maxRequest), // limit each IP to MAX_REQUEST requests per windowMs
  message: '단시간에 많은 요청이 감지되었습니다. 10분 뒤에 다시 시도해주세요.',
})