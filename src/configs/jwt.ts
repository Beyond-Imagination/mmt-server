export interface IJwtEnv {
    JWT_SECRET: string;
}

export const parseJwtEnv = (env: any): IJwtEnv => {
    const { JWT_SECRET } = env;

    if (!JWT_SECRET) {
        throw TypeError(`env JWT_SECRET expect not a falsy value but '${JWT_SECRET}'`);
    }

    return {
        JWT_SECRET,
    } as IJwtEnv;
};
