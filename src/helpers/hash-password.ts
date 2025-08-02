import * as bcrypt from 'bcrypt'

export const generateHashPassword = (pwd: string): string => {
  const salt = bcrypt.genSaltSync(Number(process.env.ROUNDS || 10))

  return bcrypt.hashSync(pwd, salt)
}

export const compareHashPassword = (pwd: string, hash: string): boolean => {
  return bcrypt.compareSync(pwd, hash)
}
