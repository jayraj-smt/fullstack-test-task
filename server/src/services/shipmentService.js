import { Op } from 'sequelize'
import db from '../models/index.js'

const { Shipment } = db

export const getShipments = async ({
  filters = {},
  page = 1,
  limit = 20,
  sort = { by: 'createdAt', order: 'DESC' },
}) => {
  const where = {}

  if (filters.shipmentStatus) where.shipmentStatus = filters.shipmentStatus
  if (filters.search) {
    const q = `%${filters.search}%`
    where[Op.or] = [
      { shipperName: { [Op.iLike]: q } },
      { carrierName: { [Op.iLike]: q } },
      { trackingNumber: { [Op.iLike]: q } },
    ]
  }

  const offset = (page - 1) * limit
  const order = [[sort.by || 'createdAt', sort.order || 'DESC']]

  const result = await Shipment.findAndCountAll({ where, limit, offset, order })
  return {
    rows: result.rows,
    count: result.count,
    page,
    pages: Math.ceil(result.count / limit),
  }
}

export const getShipmentById = async (id) => Shipment.findByPk(id)

export const addShipment = async (payload) => Shipment.create(payload)

export const updateShipment = async (id, payload) => {
  const shipment = await getShipmentById(id)
  if (!shipment) throw new Error('Shipment not found')
  return shipment.update(payload)
}

export const deleteShipment = async (id) => {
  const shipment = await getShipmentById(id)
  if (!shipment) throw new Error('Shipment not found')
  await Shipment.destroy({ where: { id } })
  return true
}
