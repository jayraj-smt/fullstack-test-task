import { gql } from 'apollo-server'

export default gql`
  scalar DateTime

  enum Role {
    Admin
    Employee
  }

  type User {
    id: ID!
    email: String!
    role: Role!
  }

  type Shipment {
    id: ID!
    shipperName: String!
    carrierName: String
    pickupLocation: String
    deliveryLocation: String
    trackingNumber: String
    shipmentStatus: String
    rate: Float
    eta: DateTime
    createdAt: DateTime
    updatedAt: DateTime
  }

  input ShipmentFilter {
    shipmentStatus: String
    search: String
  }

  input SortInput {
    by: String
    order: String
  }

  type ShipmentPage {
    rows: [Shipment!]!
    count: Int!
    page: Int!
    pages: Int!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input AddShipmentInput {
    shipperName: String!
    carrierName: String
    pickupLocation: String
    deliveryLocation: String
    trackingNumber: String
    shipmentStatus: String
    rate: Float
    eta: DateTime
  }

  input UpdateShipmentInput {
    shipperName: String
    carrierName: String
    pickupLocation: String
    deliveryLocation: String
    trackingNumber: String
    shipmentStatus: String
    rate: Float
    eta: DateTime
  }

  type Query {
    shipments(
      filters: ShipmentFilter
      page: Int
      limit: Int
      sort: SortInput
    ): ShipmentPage!
    shipment(id: ID!): Shipment
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    addShipment(input: AddShipmentInput!): Shipment!
    updateShipment(id: ID!, input: UpdateShipmentInput!): Shipment!
    deleteShipment(id: ID!): Boolean!
  }
`
