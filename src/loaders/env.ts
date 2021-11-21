import * as dotenv from 'dotenv'
import {resolve} from 'path'

(() => {
  const envPath = resolve(`${__dirname}/../../env`)
  const path = resolve(`${envPath}/.env`)

  const envFound = dotenv.config({ path })

  if (envFound.error) {
    throw new Error('⚠️  Couldn\'t find .env file  ⚠️')
  }
})()