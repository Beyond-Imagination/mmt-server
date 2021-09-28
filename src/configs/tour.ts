export interface ITourEnv {
	TOUR_SERVICE_KEY: string;
}

export const parseTourEnv = (env: any): ITourEnv => {
	const { TOUR_SERVICE_KEY } = env;

	if (!TOUR_SERVICE_KEY) {
		throw TypeError(`env TOUR_SERVICE_KEY expect not a falsy value but '${TOUR_SERVICE_KEY}'`);
	}

	return {
		TOUR_SERVICE_KEY,
	} as ITourEnv;
};
