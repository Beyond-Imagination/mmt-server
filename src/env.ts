import {getOsEnv, getOsEnvArray, toNumber} from '@/libs/env'

export const env = {
  nodeEnv: process.env.NODE_ENV || 'production',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',

  // APPLICATION
  port: toNumber(getOsEnv('APP_PORT', '3005')),
  host: getOsEnv('APP_HOST', 'localhost'),
  maxRequest: toNumber(getOsEnv('MAX_REQUEST', '250')),
  allowedOrigin: getOsEnvArray('ALLOWED_ORIGINS'),

  // EXPRESS SESSION
  sessionKey: getOsEnv('SESSION_KEY'),

  // JWT
  jwtSecret: getOsEnv('JWT_SECRET'),

  // DB
  dbURI: getOsEnv('DB_URI'),

  // TOUR API
  tour: {
    serviceKey: getOsEnv('TOUR_SERVICE_KEY'),
  },

  // AWS
  aws: {
    profile: getOsEnv('AWS_PROFILE'),
    s3BucketName: getOsEnv('AWS_S3_BUCKET_NAME'),
  },

  // KAS
  kas: {
    chainId: toNumber(getOsEnv('KAS_CHAIN_ID')),
    accessKeyId: getOsEnv('KAS_ACCESS_KEY_ID'),
    secretAccessKey: getOsEnv('KAS_SECRET_ACCESS_KEY'),
    nftContractAddress: getOsEnv('NFT_CONTRACT_ADDRESS'),
    nftName: getOsEnv('NFT_NAME'),
  }
}
