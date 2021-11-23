import morgan from 'morgan'
import {createRotateLogStream, parseToken, buildFormat} from './utils'

export const FileStreamAll = (options = {}) =>
  morgan(
    (tokens, req, res) => {
      const parsedToken = parseToken(tokens, req, res)

      return buildFormat(null, parsedToken)
    },
    {
      stream: createRotateLogStream({ signature: 'morgan-all', ...options })
    }
  )
