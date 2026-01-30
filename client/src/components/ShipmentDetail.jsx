import React, { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

const statusStyles = {
  Delivered: {
    ring: 'ring-1 ring-green-100',
    bg: 'bg-green-50',
    text: 'text-green-700',
  },
  'In Transit': {
    ring: 'ring-1 ring-yellow-100',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
  },
  Cancelled: {
    ring: 'ring-1 ring-red-100',
    bg: 'bg-red-50',
    text: 'text-red-700',
  },
  Flagged: {
    ring: 'ring-1 ring-indigo-100',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
  },
}

export default function ShipmentDetail({ shipment, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!shipment) return null

  const sStyle = statusStyles[shipment.shipmentStatus] || {
    ring: '',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
  }

  return (
    <div
      className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'
      onClick={onClose}
      aria-modal='true'
    >
      <div
        className={`bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 mx-4 border-l-4 ${sStyle.text} ${sStyle.bg}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-start justify-between gap-4 mb-4'>
          <div>
            <h3 className='text-xl font-semibold text-slate-800'>
              Shipment Details
            </h3>
            <div className='text-sm text-gray-500 mt-1'>
              Tracking:{' '}
              <span className='font-medium text-slate-700'>
                {shipment.trackingNumber}
              </span>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${sStyle.bg} ${sStyle.text} ${sStyle.ring}`}
            >
              {shipment.shipmentStatus}
            </div>
            <button
              onClick={onClose}
              aria-label='Close details'
              className='rounded-md p-2 hover:bg-gray-100 text-gray-600'
            >
              <FiX className='w-5 h-5' />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6 mb-4'>
          <div className='space-y-3'>
            <div className='text-xs text-gray-500'>Shipper</div>
            <div className='text-sm font-medium text-slate-800'>
              {shipment.shipperName}
            </div>

            <div className='text-xs text-gray-500 mt-3'>Pickup</div>
            <div className='text-sm text-gray-700'>
              {shipment.pickupLocation}
            </div>

            <div className='text-xs text-gray-500 mt-3'>ETA</div>
            <div className='text-sm text-gray-700'>
              {shipment.eta ? new Date(shipment.eta).toLocaleString() : '-'}
            </div>
          </div>

          <div className='space-y-3'>
            <div className='text-xs text-gray-500'>Carrier</div>
            <div className='text-sm font-medium text-slate-800'>
              {shipment.carrierName}
            </div>

            <div className='text-xs text-gray-500 mt-3'>Delivery</div>
            <div className='text-sm text-gray-700'>
              {shipment.deliveryLocation}
            </div>

            <div className='text-xs text-gray-500 mt-3'>Rate</div>
            <div className='text-sm text-gray-700'>
              ${shipment.rate?.toFixed(2)}
            </div>
          </div>
        </div>

        <div className='border-t pt-4 flex items-center justify-between text-sm text-gray-500'>
          <div>Created: {new Date(shipment.createdAt).toLocaleString()}</div>
          {/* <div className='text-xs'>Status: <span className='font-medium text-slate-700 ml-2'>{shipment.shipmentStatus}</span></div> */}
        </div>
      </div>
    </div>
  )
}
