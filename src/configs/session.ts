export interface ISessionEnv {
    SESSION_KEY: string;
}

export const parseSessionEnv = (env: any): ISessionEnv => {
    const { SESSION_KEY } = env;

    if (!SESSION_KEY) {
        throw TypeError(`env SESSION_KEY expect not a falsy value but '${SESSION_KEY}'`);
    }

    return {
        SESSION_KEY,
    } as ISessionEnv;
};
