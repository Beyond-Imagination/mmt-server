import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import {env} from '@/env'

export const mongooseLoader = async (): Promise<void> => {
  const {dbURI} = env

  autoIncrement.initialize(mongoose.connection)

  await mongoose.connect(dbURI)

  console.info('mongodb loaded and connected')
}
