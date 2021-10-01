export interface IAWSEnv {
	AWS_PROFILE: string;
	AWS_S3_BUCKET_NAME: string;
}

export const parseAWSEnv = (env: any): IAWSEnv => {
	const { AWS_PROFILE, AWS_S3_BUCKET_NAME } = env;

	if (!AWS_PROFILE) {
		throw TypeError(`env AWS_PROFILE expect not a falsy value but '${AWS_PROFILE}'`);
	}

	if (!AWS_S3_BUCKET_NAME) {
		throw TypeError(`env AWS_S3_BUCKET_NAME expect not a falsy value but '${AWS_S3_BUCKET_NAME}'`);
	}

	return {
		AWS_PROFILE,
		AWS_S3_BUCKET_NAME,
	} as IAWSEnv;
};
