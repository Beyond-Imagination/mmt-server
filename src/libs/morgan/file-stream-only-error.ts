import morgan from 'morgan'
import {createRotateLogStream, parseToken, buildFormat} from './utils'

export const FileStreamOnlyError = (options = {}) =>
  morgan(
    (tokens, req, res) => {
      const parsedToken = parseToken(tokens, req, res)

      return buildFormat(null, parsedToken)
    },
    {
      stream: createRotateLogStream({ signature: 'morgan-error' }),

      skip(req, res) {
        return res.statusCode < 400
      },
      ...options
    }
  )
