import { GraphQLScalarType, Kind } from 'graphql'
import { AuthenticationError, AuthorizationError } from '../../utils/errors.js'
import { signToken } from '../../utils/jwt.js'
import { findUserByEmail, verifyPassword } from '../../services/userService.js'
import {
  getShipments,
  getShipmentById,
  addShipment,
  updateShipment,
  deleteShipment,
} from '../../services/shipmentService.js'

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime scalar as ISO string',
  serialize(value) {
    return value ? new Date(value).toISOString() : null
  },
  parseValue(value) {
    return value ? new Date(value) : null
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }
    return null
  },
})

const resolvers = {
  DateTime,
  Query: {
    shipments: async (_, { filters, page = 1, limit = 20, sort }, context) => {
      // authorization: allow both Admin and Employee to read
      // Delegates to service
      const data = await getShipments({ filters, page, limit, sort })
      return data
    },
    shipment: async (_, { id }) => getShipmentById(id),
    me: async (_, __, context) => context.user || null,
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await findUserByEmail(email)
      if (!user) throw new AuthenticationError('Invalid email or password')
      const ok = await verifyPassword(user, password)
      if (!ok) throw new AuthenticationError('Invalid email or password')
      const token = signToken({ id: user.id, role: user.role })
      return {
        token,
        user: { id: user.id, email: user.email, role: user.role },
      }
    },
    addShipment: async (_, { input }, context) => {
      if (!context.user) throw new AuthorizationError('Not authenticated')
      if (context.user.role !== 'Admin')
        throw new AuthorizationError('Requires Admin role')
      return addShipment(input)
    },
    updateShipment: async (_, { id, input }, context) => {
      if (!context.user) throw new AuthorizationError('Not authenticated')
      if (context.user.role !== 'Admin')
        throw new AuthorizationError('Requires Admin role')
      return updateShipment(id, input)
    },
    deleteShipment: async (_, { id }, context) => {
      if (!context.user) throw new AuthorizationError('Not authenticated')
      if (context.user.role !== 'Admin')
        throw new AuthorizationError('Requires Admin role')
      return deleteShipment(id)
    },
  },
}

export default resolvers
