import { verifyToken } from '../utils/jwt.js'
import { AuthenticationError } from '../utils/errors.js'
import db from '../models/index.js'

export const getUserFromAuthHeader = async (authHeader) => {
  if (!authHeader) return null
  const token = authHeader.replace('Bearer ', '')
  try {
    const payload = verifyToken(token)
    const user = await db.User.findByPk(payload.id)
    return user
  } catch (err) {
    throw new AuthenticationError('Invalid token')
  }
}
