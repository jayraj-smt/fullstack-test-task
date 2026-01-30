import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  return queryInterface.createTable('shipments', {
    id: {
      type: DataTypes.UUID,
      defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
      primaryKey: true,
    },
    shipperName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrierName: {
      type: DataTypes.STRING,
    },
    pickupLocation: {
      type: DataTypes.STRING,
    },
    deliveryLocation: {
      type: DataTypes.STRING,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    shipmentStatus: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.FLOAT,
    },
    eta: {
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal('now()'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal('now()'),
    },
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('shipments')
}
