import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import ShipmentsTable from '../components/ShipmentsTable.jsx'
import ShipmentCard from '../components/ShipmentCard.jsx'
import Pagination from '../components/Pagination.jsx'
import ShipmentDetail from '../components/ShipmentDetail.jsx'
import AddShipmentModal from '../components/AddShipmentModal.jsx'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'

const SHIPMENTS = gql`
  query Shipments(
    $page: Int
    $limit: Int
    $sort: SortInput
    $filters: ShipmentFilter
  ) {
    shipments(page: $page, limit: $limit, sort: $sort, filters: $filters) {
      rows {
        id
        shipperName
        carrierName
        trackingNumber
        shipmentStatus
        rate
        eta
        createdAt
      }
      count
      page
      pages
    }
  }
`

export default function ShipmentsPage() {
  const [view, setView] = useState('grid') // grid | tile
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [selected, setSelected] = useState(null)
  const [sort, setSort] = useState({ by: 'createdAt', order: 'DESC' })

  const { data, loading, error, refetch } = useQuery(SHIPMENTS, {
    variables: { page, limit, sort },
    fetchPolicy: 'network-only',
  })

  const handleSort = (field) => {
    setPage(1)
    setSort((s) => {
      if (s.by === field) {
        return { by: field, order: s.order === 'ASC' ? 'DESC' : 'ASC' }
      }
      // default order: ASC for most fields, but keep createdAt default DESC
      return { by: field, order: field === 'createdAt' ? 'DESC' : 'ASC' }
    })
  }

  const shipments = data?.shipments?.rows || []
  const count = data?.shipments?.count || 0
  const pages = data?.shipments?.pages || 1

  const { user } = useAuth()
  const [addOpen, setAddOpen] = useState(false)
  const { showToast } = useToast()

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-semibold'>Shipments</h2>
          <div className='text-sm text-gray-500'>
            Overview of active shipments
          </div>
        </div>

        <div className='flex items-center gap-3'>
          {user?.role === 'Admin' && (
            <button
              onClick={() => setAddOpen(true)}
              className='btn btn-primary'
            >
              Add Shipment
            </button>
          )}
          <button
            onClick={() => setView(view === 'grid' ? 'tile' : 'grid')}
            className='btn btn-ghost'
          >
            {view === 'grid' ? 'Tile View' : 'Grid View'}
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <ShipmentsTable
          shipments={shipments}
          onRowClick={setSelected}
          loading={loading}
          onRefetch={refetch}
          sort={sort}
          onSort={handleSort}
          isAdmin={user?.role === 'Admin'}
        />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {shipments.map((s) => (
            <ShipmentCard
              key={s.id}
              shipment={s}
              onOpen={() => setSelected(s)}
              onRefetch={refetch}
            />
          ))}
        </div>
      )}

      <div className='mt-6 flex justify-end'>
        <Pagination page={page} pages={pages} onChange={setPage} />
      </div>

      {selected && (
        <ShipmentDetail shipment={selected} onClose={() => setSelected(null)} />
      )}

      {addOpen && (
        <AddShipmentModal
          onClose={() => setAddOpen(false)}
          onSaved={() => {
            setAddOpen(false)
            refetch()
            showToast('Shipment added')
          }}
        />
      )}
    </div>
  )
}
