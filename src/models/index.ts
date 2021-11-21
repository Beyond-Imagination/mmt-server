import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import {env} from '@/env'
autoIncrement.initialize(mongoose.connection)

const {dbURI} = env

const connect = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('MongoDB connected!!')
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
    throw err
  }
}

export default {
  connect: connect,
}
