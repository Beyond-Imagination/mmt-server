export interface IDBEnv {
    DB_URI: string;
}

export const parseDBEnv = (env: any): IDBEnv => {
    const { DB_URI } = env;

    if (!DB_URI) {
        throw TypeError(`env DB_URI expect not a falsy value but '${DB_URI}'`);
    }

    return {
        DB_URI,
    } as IDBEnv;
};
