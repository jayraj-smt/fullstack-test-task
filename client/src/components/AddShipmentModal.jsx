import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useToast } from '../hooks/useToast'

const ADD_SHIPMENT = gql`
  mutation AddShipment($input: AddShipmentInput!) {
    addShipment(input: $input) {
      id
      shipperName
      carrierName
      pickupLocation
      deliveryLocation
      trackingNumber
      shipmentStatus
      rate
      eta
      createdAt
    }
  }
`

export default function AddShipmentModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    shipperName: '',
    carrierName: '',
    pickupLocation: '',
    deliveryLocation: '',
    trackingNumber: '',
    shipmentStatus: 'Pending',
    rate: 0,
    eta: '',
  })

  const { showToast } = useToast()

  const [addShipment, { loading }] = useMutation(ADD_SHIPMENT, {
    onCompleted: () => {
      if (onSaved) onSaved()
      showToast('Shipment added')
    },
    onError: (err) => {
      console.error(err)
      showToast('Failed to add shipment', { type: 'error' })
    },
  })

  const submit = async (e) => {
    e.preventDefault()
    const input = {
      ...form,
      rate: Number(form.rate) || 0,
      eta: form.eta ? new Date(form.eta).toISOString() : null,
    }
    await addShipment({ variables: { input } })
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-30' onClick={onClose} />
      <div className='bg-white rounded-lg shadow-card p-6 w-full max-w-lg z-10'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold'>Add Shipment</h3>
        </div>
        <form onSubmit={submit} className='space-y-3'>
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-sm font-medium'>Shipper</label>
              <input
                required
                value={form.shipperName}
                onChange={(e) =>
                  setForm({ ...form, shipperName: e.target.value })
                }
                className='mt-1 block w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Carrier</label>
              <input
                value={form.carrierName}
                onChange={(e) =>
                  setForm({ ...form, carrierName: e.target.value })
                }
                className='mt-1 block w-full p-2 border rounded'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-sm font-medium'>Pickup</label>
              <input
                value={form.pickupLocation}
                onChange={(e) =>
                  setForm({ ...form, pickupLocation: e.target.value })
                }
                className='mt-1 block w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Delivery</label>
              <input
                value={form.deliveryLocation}
                onChange={(e) =>
                  setForm({ ...form, deliveryLocation: e.target.value })
                }
                className='mt-1 block w-full p-2 border rounded'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-sm font-medium'>
                Tracking Number
              </label>
              <input
                value={form.trackingNumber}
                onChange={(e) =>
                  setForm({ ...form, trackingNumber: e.target.value })
                }
                className='mt-1 block w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Status</label>
              <input
                value={form.shipmentStatus}
                onChange={(e) =>
                  setForm({ ...form, shipmentStatus: e.target.value })
                }
                className='mt-1 block w-full p-2 border rounded'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-sm font-medium'>Rate</label>
              <input
                type='number'
                value={form.rate}
                onChange={(e) => setForm({ ...form, rate: e.target.value })}
                className='mt-1 block w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>ETA</label>
              <input
                type='date'
                value={form.eta}
                onChange={(e) => setForm({ ...form, eta: e.target.value })}
                className='mt-1 block w-full p-2 border rounded'
              />
            </div>
          </div>

          <div className='flex justify-end gap-2'>
            <button type='button' onClick={onClose} className='btn btn-ghost'>
              Cancel
            </button>
            <button
              disabled={loading}
              type='submit'
              className='btn btn-primary'
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
