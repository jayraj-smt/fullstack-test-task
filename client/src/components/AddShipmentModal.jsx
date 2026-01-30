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
    rate: '',
    eta: '',
  })

  const [errors, setErrors] = useState({})

  const statuses = [
    'Pending',
    'In Transit',
    'Delivered',
    'Cancelled',
    'Flagged',
  ]

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

  const validate = () => {
    const e = {}
    if (!form.shipperName || !form.shipperName.trim())
      e.shipperName = 'Shipper is required'
    if (!form.trackingNumber || !form.trackingNumber.trim())
      e.trackingNumber = 'Tracking number is required'
    else if (!/^\d+$/.test(form.trackingNumber.trim()))
      e.trackingNumber = 'Tracking number must contain only digits'

    const rateNum = Number(form.rate)
    if (form.rate === '' || Number.isNaN(rateNum)) e.rate = 'Rate is required'
    else if (rateNum <= 0) e.rate = 'Rate must be greater than 0'

    if (!statuses.includes(form.shipmentStatus))
      e.shipmentStatus = 'Please select a valid status'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      showToast('Please fix validation errors', { type: 'error' })
      return
    }

    const input = {
      shipperName: form.shipperName.trim(),
      carrierName: form.carrierName.trim() || null,
      pickupLocation: form.pickupLocation.trim() || null,
      deliveryLocation: form.deliveryLocation.trim() || null,
      trackingNumber: form.trackingNumber.trim(),
      shipmentStatus: form.shipmentStatus,
      rate: Number(form.rate),
      eta: form.eta ? new Date(form.eta).toISOString() : null,
    }

    await addShipment({ variables: { input } })
    onClose()
  }

  const isDisabled =
    loading ||
    !form.shipperName.trim() ||
    !form.trackingNumber.trim() ||
    errors.trackingNumber ||
    errors.rate

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-30' onClick={onClose} />
      <div className='bg-white rounded-lg shadow-card p-6 w-full max-w-lg z-10'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold'>Add Shipment</h3>
        </div>
        <form onSubmit={submit} className='space-y-3' noValidate>
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-sm font-medium'>Shipper</label>
              <input
                required
                value={form.shipperName}
                onChange={(e) => {
                  setForm({ ...form, shipperName: e.target.value })
                  setErrors({ ...errors, shipperName: '' })
                }}
                aria-invalid={!!errors.shipperName}
                aria-describedby={
                  errors.shipperName ? 'shipper-error' : undefined
                }
                className='mt-1 block w-full p-2 border rounded'
              />
              {errors.shipperName && (
                <div id='shipper-error' className='text-red-600 text-sm mt-1'>
                  {errors.shipperName}
                </div>
              )}
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
                required
                value={form.trackingNumber}
                onChange={(e) => {
                  setForm({ ...form, trackingNumber: e.target.value })
                  if (!/^\d*$/.test(e.target.value.trim())) {
                    setErrors({
                      ...errors,
                      trackingNumber:
                        'Tracking number must contain only digits',
                    })
                  } else {
                    setErrors({ ...errors, trackingNumber: '' })
                  }
                }}
                aria-invalid={!!errors.trackingNumber}
                aria-describedby={
                  errors.trackingNumber ? 'tracking-error' : undefined
                }
                className={`mt-1 block w-full p-2 border rounded ${errors.trackingNumber ? 'border-red-400' : ''}`}
              />
              {errors.trackingNumber && (
                <div id='tracking-error' className='text-red-600 text-sm mt-1'>
                  {errors.trackingNumber}
                </div>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium'>Status</label>
              <select
                value={form.shipmentStatus}
                onChange={(e) => {
                  setForm({ ...form, shipmentStatus: e.target.value })
                  setErrors({ ...errors, shipmentStatus: '' })
                }}
                className='mt-1 block w-full p-2 border rounded'
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.shipmentStatus && (
                <div className='text-red-600 text-sm mt-1'>
                  {errors.shipmentStatus}
                </div>
              )}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-sm font-medium'>Rate</label>
              <input
                type='number'
                min='0'
                step='0.01'
                value={form.rate}
                onChange={(e) => {
                  setForm({ ...form, rate: e.target.value })
                  const v = e.target.value
                  const num = Number(v)
                  if (v === '' || Number.isNaN(num))
                    setErrors({ ...errors, rate: 'Rate is required' })
                  else if (num <= 0)
                    setErrors({
                      ...errors,
                      rate: 'Rate must be greater than 0',
                    })
                  else setErrors({ ...errors, rate: '' })
                }}
                aria-invalid={!!errors.rate}
                aria-describedby={errors.rate ? 'rate-error' : undefined}
                className={`mt-1 block w-full p-2 border rounded ${errors.rate ? 'border-red-400' : ''}`}
              />
              {errors.rate && (
                <div id='rate-error' className='text-red-600 text-sm mt-1'>
                  {errors.rate}
                </div>
              )}
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
              disabled={isDisabled}
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
