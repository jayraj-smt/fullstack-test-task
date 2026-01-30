import { subDays, addDays } from 'date-fns'

function makeShipment(seed) {
  const n = seed.toString().padStart(4, '0')
  const now = new Date()
  return {
    id: `00000000-0000-0000-0000-00000000${n}`,
    shipperName: `Shipper ${seed}`,
    carrierName: `Carrier ${seed % 5}`,
    pickupLocation: `Warehouse ${seed % 10}`,
    deliveryLocation: `Customer ${seed % 20}`,
    trackingNumber: `TRK-${n}`,
    shipmentStatus: ['Pending', 'In Transit', 'Delivered', 'Cancelled'][
      seed % 4
    ],
    rate: Number((100 + (seed % 100)).toFixed(2)),
    eta: addDays(now, seed % 10),
    createdAt: subDays(now, seed % 30),
    updatedAt: now,
  }
}

export async function up({ context: queryInterface }) {
  const rows = []
  for (let i = 1; i <= 80; i += 1) {
    rows.push(makeShipment(i))
  }
  return queryInterface.bulkInsert('shipments', rows)
}

export async function down({ context: queryInterface }) {
  return queryInterface.bulkDelete('shipments', null, {})
}
