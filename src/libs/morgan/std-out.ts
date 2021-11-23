import morgan from 'morgan'
import {parseToken, paintToken, buildFormat} from './utils'

export const StdOut = (options = {}): any =>
  morgan(
    (tokens, req, res) => {
      const parsedToken = parseToken(tokens, req, res)
      const colorizedToken = paintToken(parsedToken)

      return buildFormat(null, colorizedToken)
    },
    {
      skip(req) {
        const { url } = req

        const skipFilter = [
          /\/font/,
          /\/image/,
          /\/js/,
          /\/scss/,
          /\/thridParty/,
          /\/ELB-HealthChecker/
        ]

        return skipFilter.some(reg => reg.test(url))
      },
      ...options
    }
  )
