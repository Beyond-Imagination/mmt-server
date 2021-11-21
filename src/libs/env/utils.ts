function isExist(key: string | undefined, def: string | undefined = undefined) {
  return (process.env[key] ?? def) !== undefined
}

function validateEnv(key: string | undefined, def: string | undefined): void {
  if (!isExist(key)) {
    if (def === undefined) {
      throw new Error(`env ${key} is not set.`)
    } else {
      console.warn(`env ${key} is not set. use default value ${def}`)
    }
  }
}

export function getOsEnv(key: string, def: string = undefined): string {
  validateEnv(key, def)
  return process.env[key] ?? def
}

export function getOsEnvArray(key: string, def: string | undefined = undefined, delimiter: string = ','): string[] {
  validateEnv(key, def)
  return (process.env[key] ?? def).split(delimiter) || []
}

export function toNumber(value: string): number {
  return parseInt(value, 10)
}