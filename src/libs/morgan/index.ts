import dayjs from 'dayjs'
import morgan from 'morgan'

import {FileStreamAll} from './file-stream-all'
import {StdOut} from './std-out'
import {FileStreamOnlyError} from './file-stream-only-error'

export const morganLogger = function () {
  morgan.token('date', () => {
    return dayjs().locale('ko').format('YYYY-MM-DD HH:mm:ss')
  })

  return [
    StdOut(),
    FileStreamAll(),
    FileStreamOnlyError(),
  ]
}