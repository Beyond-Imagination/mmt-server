import * as dotenv from 'dotenv';
import { resolve } from 'path';

import { IJwtEnv, parseJwtEnv } from './jwt';
import { INodeEnv, parseNodeEnv } from './node';
import { ISessionEnv, parseSessionEnv } from './session';
import { ITourEnv, parseTourEnv } from './tour';
import { IAWSEnv, parseAWSEnv } from './aws';
import { IKASEnv, parseKASEnv } from './kas';
import { IDBEnv, parseDBEnv } from './db';

export interface IGlobalConfig
	extends IJwtEnv,
		INodeEnv,
		ISessionEnv,
		ITourEnv,
		IAWSEnv,
		IKASEnv,
		IDBEnv {}

export const loadConfigFromDotEnv = (
	envPath: string,
	NODE_ENV: 'development' | 'production' | 'test' | string
): IGlobalConfig => {
	let path = null;

	if (NODE_ENV === 'development') {
		path = `${envPath}/.env.dev`;
	} else if (NODE_ENV === 'production') {
		path = `${envPath}/.env`;
	} else if (NODE_ENV === 'test') {
		path = `${envPath}/.env.test`;
	} else {
		throw new TypeError(`NODE_ENV=${NODE_ENV} is not expected`);
	}
	path = resolve(path);

	// load .env file
	// .env 파일 뿐만 아니라 환경변수에서 있는 값또한 가져온다.
	dotenv.config({ path });

	// parse and return config from .env
	const { env } = process;

	return {
		// jwt
		...parseJwtEnv(env),

		// node env
		...parseNodeEnv(env),

		// session
		...parseSessionEnv(env),

		// tour api
		...parseTourEnv(env),

		// aws api
		...parseAWSEnv(env),

		// kas api
		...parseKASEnv(env),

		// db
		...parseDBEnv(env),
	} as IGlobalConfig;
};

/**
 * load config from .env file and process.en
 *
 * use 'development' as default NODE_ENV
 * use *.env file in /
 *
 */
export const configLoader = (): IGlobalConfig => {
	// load .env by NODE_ENV type
	const NODE_ENV = process.env.NODE_ENV || 'development';

	// reference /*.env
	const rootENVPath = resolve(`${__dirname}/../env`);

	return {
		...loadConfigFromDotEnv(rootENVPath, NODE_ENV),
	} as IGlobalConfig;
};
