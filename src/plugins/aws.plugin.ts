import AWS from 'aws-sdk'
import dynamoose from 'dynamoose'
import {env} from '@/env'

const region = 'ap-northeast-2'
const {aws: {profile}} = env

const credentials = new AWS.SharedIniFileCredentials({ profile })

AWS.config.update({ region })
AWS.config.credentials = credentials

dynamoose.aws.sdk.config.update({
  region,
  ...credentials
})
