import React from 'react'
import ShipmentMenu from './ShipmentMenu.jsx'

export default function ShipmentCard({ shipment, onOpen, onRefetch }) {
  return (
    <div
      className='card hover:shadow-md transition-shadow cursor-pointer'
      onClick={() => onOpen(shipment)}
    >
      <div className='flex justify-between items-start gap-4'>
        <div>
          <div className='text-xs text-gray-500'>{shipment.trackingNumber}</div>
          <div className='font-semibold text-slate-800'>
            {shipment.shipperName}
          </div>
          <div className='text-sm text-gray-600'>
            {shipment.deliveryLocation}
          </div>
        </div>
        <div className='text-right flex flex-col items-end gap-2'>
          <div className='inline-flex items-center gap-2'>
            <span
              className={`px-2 py-1 text-xs rounded-full ${shipment.shipmentStatus === 'Delivered' ? 'bg-green-100 text-green-800' : shipment.shipmentStatus === 'In Transit' ? 'bg-yellow-100 text-yellow-800' : shipment.shipmentStatus === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
            >
              {shipment.shipmentStatus}
            </span>
            <div className='text-sm text-gray-500'>
              {new Date(shipment.eta).toLocaleDateString?.() || '-'}
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <ShipmentMenu shipment={shipment} onRefetch={onRefetch} />
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpen(shipment)
              }}
              className='text-sm text-indigo-600'
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
