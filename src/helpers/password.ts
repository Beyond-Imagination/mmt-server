import bcrypt from 'bcrypt'

export function generatePassword (password: string) {
  return bcrypt.hashSync(password, 10)
}

export function comparePassword (password1: string, password2: string) {
  return bcrypt.compareSync(password1, password2)
}
