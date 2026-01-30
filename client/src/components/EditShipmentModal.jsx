import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useToast } from '../hooks/useToast'

const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($id: ID!, $input: UpdateShipmentInput!) {
    updateShipment(id: $id, input: $input) {
      id
      shipperName
      carrierName
      pickupLocation
      deliveryLocation
      trackingNumber
      shipmentStatus
      rate
      eta
    }
  }
`

export default function EditShipmentModal({ shipment, onClose, onSaved }) {
  const [form, setForm] = useState({
    shipperName: shipment.shipperName || '',
    carrierName: shipment.carrierName || '',
    pickupLocation: shipment.pickupLocation || '',
    deliveryLocation: shipment.deliveryLocation || '',
    trackingNumber: shipment.trackingNumber || '',
    shipmentStatus: shipment.shipmentStatus || '',
    rate: shipment.rate || 0,
  })

  const { showToast } = useToast()

  const [updateShipment, { loading }] = useMutation(UPDATE_SHIPMENT, {
    onCompleted: () => {
      if (onSaved) onSaved()
      showToast('Shipment updated')
    },
    onError: (err) => {
      console.error(err)
      showToast('Failed to update', { type: 'error' })
    },
  })

  const submit = async (e) => {
    e.preventDefault()
    await updateShipment({ variables: { id: shipment.id, input: { ...form } } })
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-30' onClick={onClose} />
      <div className='bg-white rounded-lg shadow-card p-6 w-full max-w-lg z-10'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold'>Edit Shipment</h3>
        </div>
        <form onSubmit={submit} className='space-y-3 text-left'>
          <div>
            <label className='block text-sm font-medium'>Shipper</label>
            <input
              value={form.shipperName}
              onChange={(e) =>
                setForm({ ...form, shipperName: e.target.value })
              }
              className='mt-1 block w-full p-2 border rounded'
            />
          </div>
          <div className='grid grid-cols-2 gap-3'>
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
          <div>
            <label className='block text-sm font-medium'>
              Delivery Location
            </label>
            <input
              value={form.deliveryLocation}
              onChange={(e) =>
                setForm({ ...form, deliveryLocation: e.target.value })
              }
              className='mt-1 block w-full p-2 border rounded'
            />
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
