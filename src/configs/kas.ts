export interface IKASEnv {
	KAS_CHAIN_ID: number;
	KAS_ACCESS_KEY_ID: string;
	KAS_SECRET_ACCESS_KEY: string;
	NFT_NAME: string;
}

export const parseKASEnv = (env: any): IKASEnv => {
	const { KAS_CHAIN_ID, KAS_ACCESS_KEY_ID, KAS_SECRET_ACCESS_KEY, NFT_NAME } = env;

	if (Number.isNaN(KAS_CHAIN_ID)) {
        throw TypeError(`env KAS_CHAIN_ID is not a number, but '${KAS_CHAIN_ID}'`);
	}

	if (!KAS_ACCESS_KEY_ID) {
        throw TypeError(`env KAS_ACCESS_KEY_ID expect not a falsy value but '${KAS_ACCESS_KEY_ID}'`);
    }

    if (!KAS_SECRET_ACCESS_KEY) {
        throw TypeError(`env KAS_SECRET_ACCESS_KEY expect not a falsy value but '${KAS_SECRET_ACCESS_KEY}'`);
    }

    if (!NFT_NAME) {
        throw TypeError(`env NFT_NAME expect not a falsy value but '${NFT_NAME}'`);
    }

	return {
		KAS_CHAIN_ID,
        KAS_ACCESS_KEY_ID,
        KAS_SECRET_ACCESS_KEY,
        NFT_NAME,
	} as IKASEnv;
};
