import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { FiEdit2, FiFlag, FiTrash2, FiMoreVertical } from 'react-icons/fi'
import EditShipmentModal from './EditShipmentModal.jsx'
import ConfirmModal from './ConfirmModal.jsx'

const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($id: ID!, $input: UpdateShipmentInput!) {
    updateShipment(id: $id, input: $input) {
      id
      shipmentStatus
      shipperName
      carrierName
      trackingNumber
      deliveryLocation
      rate
      eta
    }
  }
`

const DELETE_SHIPMENT = gql`
  mutation DeleteShipment($id: ID!) {
    deleteShipment(id: $id)
  }
`

export default function ShipmentMenu({ shipment, onRefetch }) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const canEdit = user?.role === 'Admin'
  const canFlag = user?.role === 'Admin'
  const canDelete = user?.role === 'Admin'
  // Hide the menu entirely for users without any action permissions (Employees)
  if (!canEdit && !canFlag && !canDelete) return null

  const { showToast } = useToast()

  const [updateShipment] = useMutation(UPDATE_SHIPMENT, {
    onCompleted: () => {
      setEditOpen(false)
      if (onRefetch) onRefetch()
      showToast('Shipment updated')
    },
    onError: (err) => {
      console.error(err)
      showToast('Update failed', { type: 'error' })
    },
  })

  const [deleteShipment] = useMutation(DELETE_SHIPMENT, {
    onCompleted: () => {
      setConfirmOpen(false)
      if (onRefetch) onRefetch()
      showToast('Shipment deleted')
    },
    onError: (err) => {
      console.error(err)
      showToast('Delete failed', { type: 'error' })
    },
  })

  const toggleFlag = async (e) => {
    e.stopPropagation()
    const newStatus =
      shipment.shipmentStatus === 'Flagged' ? 'Pending' : 'Flagged'
    await updateShipment({
      variables: { id: shipment.id, input: { shipmentStatus: newStatus } },
    })
    setOpen(false)
  }

  const onEdit = (e) => {
    e.stopPropagation()
    setEditOpen(true)
    setOpen(false)
  }

  const onDelete = (e) => {
    e.stopPropagation()
    setConfirmOpen(true)
    setOpen(false)
  }

  const confirmDelete = async () => {
    await deleteShipment({ variables: { id: shipment.id } })
  }

  return (
    <div className='relative' onClick={(e) => e.stopPropagation()}>
      <button
        aria-haspopup='menu'
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((s) => !s)
        }}
        className='p-1 rounded hover:bg-gray-100'
      >
        <FiMoreVertical className='w-5 h-5 text-gray-600' />
      </button>

      {open && (
        <div
          role='menu'
          className='absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10'
        >
          {canEdit && (
            <button
              role='menuitem'
              onClick={onEdit}
              className='w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2'
            >
              <FiEdit2 className='w-4 h-4' />
              <span>Edit</span>
            </button>
          )}
          {canFlag && (
            <button
              role='menuitem'
              onClick={toggleFlag}
              className='w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2'
            >
              <FiFlag className='w-4 h-4' />
              <span>Flag</span>
            </button>
          )}
          {canDelete && (
            <button
              role='menuitem'
              onClick={onDelete}
              className='w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50 flex items-center gap-2'
            >
              <FiTrash2 className='w-4 h-4' />
              <span>Delete</span>
            </button>
          )}
        </div>
      )}

      {editOpen && (
        <EditShipmentModal
          shipment={shipment}
          onClose={() => setEditOpen(false)}
          onSaved={() => {
            if (onRefetch) onRefetch()
            setEditOpen(false)
          }}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          title='Delete shipment'
          message='Are you sure you want to delete this shipment?'
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => confirmDelete()}
        />
      )}
    </div>
  )
}
