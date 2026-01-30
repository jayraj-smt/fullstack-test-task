import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Shipment = sequelize.define(
    'Shipment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    },
    {
      tableName: 'shipments',
      indexes: [
        { fields: ['trackingNumber'] },
        { fields: ['shipmentStatus'] },
        { fields: ['createdAt'] },
      ],
    },
  )

  return Shipment
}
