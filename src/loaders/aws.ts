import AWS from 'aws-sdk'

import {env} from '@/env'

const {aws: {profile, region}} = env

export const awsLoader = () => {
  const credentials = new AWS.SharedIniFileCredentials({ profile })

  AWS.config.update({ region })
  AWS.config.credentials = credentials

  console.info('aws credentials loaded')
}