export interface INodeEnv {
	APP_PORT: number;
	APP_HOST: string;
	NODE_ENV: 'development' | 'production' | 'test';
	MAX_REQUEST: number;
}

/**
 * parse node environment variable
 * if NODE_PORT is falsy, use default value 3005
 *
 * @param env parsed node env
 */
export const parseNodeEnv = (env: any): INodeEnv => {
	let APP_PORT = parseInt(env.APP_PORT, 10);

	if (Number.isNaN(APP_PORT)) {
		console.warn(`env NODE_PORT is not a number, use default port 3005`);

		APP_PORT = 3005;
	}

	let APP_HOST = env.APP_HOST;

	if (!APP_HOST) {
		console.warn(`env APP_HOST expect not a falsy value but ${APP_HOST}. use default localhost`);

		APP_HOST = 'localhost';
	}

	let MAX_REQUEST = parseInt(env.APP_PORT, 10);

	if (Number.isNaN(MAX_REQUEST)) {
		console.warn(`env APP_HOST is not a number, use default 250`);

		MAX_REQUEST = 250;
	}

	return {
		APP_PORT,
		APP_HOST,
		NODE_ENV: env.NODE_ENV,
		MAX_REQUEST
	} as INodeEnv;
};
