import bcrypt from 'bcrypt'
import db from '../models/index.js'

const { User } = db

export const findUserByEmail = async (email) => {
  return User.findOne({ where: { email } })
}

export const createUser = async ({ email, password, role = 'Employee' }) => {
  const passwordHash = await bcrypt.hash(password, 10)
  return User.create({ email, passwordHash, role })
}

export const verifyPassword = async (user, password) => {
  if (!user) return false
  return bcrypt.compare(password, user.passwordHash)
}
