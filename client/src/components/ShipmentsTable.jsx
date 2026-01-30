import React from 'react'
import ShipmentMenu from './ShipmentMenu.jsx'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function ShipmentsTable({
  shipments,
  onRowClick,
  loading,
  onRefetch,
  sort,
  onSort = () => {},
  isAdmin = false,
}) {
  if (loading)
    return (
      <div className='p-6 text-center text-gray-500'>Loading shipments...</div>
    )

  if (!shipments || shipments.length === 0)
    return (
      <div className='p-6 text-center text-gray-500'>No shipments found.</div>
    )

  const headerClass = 'px-4 py-3 text-left text-sm font-medium text-gray-600'

  const SortIcon = ({ field }) => {
    if (!sort || sort.by !== field)
      return <FiChevronDown className='w-4 h-4 text-gray-300' />
    return sort.order === 'ASC' ? (
      <FiChevronUp className='w-4 h-4 text-gray-500' />
    ) : (
      <FiChevronDown className='w-4 h-4 text-gray-500' />
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-card overflow-auto'>
      <table className='min-w-full table-auto'>
        <thead>
          <tr className='bg-slate-50 border-b'>
            <th className={`${headerClass}`}>Shipment</th>
            <th className={`${headerClass}`}>Shipper</th>
            <th className={`${headerClass}`}>Carrier</th>
            <th className={`${headerClass} text-center`}>Tracking</th>
            <th className={`${headerClass} text-center`}>Status</th>
            <th className={`${headerClass} text-center`}>ETA</th>
            <th className={`${headerClass} text-right`}>Rate</th>
            <th className={`${headerClass} text-center`}>
              <button
                type='button'
                className='inline-flex items-center justify-center gap-2 w-full text-sm text-gray-700'
                onClick={() => onSort('createdAt')}
                aria-sort={
                  sort?.by === 'createdAt'
                    ? sort.order === 'ASC'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }
              >
                <span>Created</span>
                <SortIcon field='createdAt' />
              </button>
            </th>
            {isAdmin && (
              <th className={`${headerClass} text-right`}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, idx) => (
            <tr
              key={s.id}
              className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} table-row cursor-pointer`}
              onClick={() => onRowClick(s)}
            >
              <td className='px-4 py-3 text-sm font-medium'>
                <div className='text-slate-800'>{s.shipperName}</div>
                <div className='text-xs text-gray-500'>
                  {s.id.split('-')[4].slice(-6)}
                </div>
              </td>
              <td className='px-4 py-3 text-sm text-gray-700'>
                {s.shipperName}
              </td>
              <td className='px-4 py-3 text-sm text-gray-700'>
                {s.carrierName}
              </td>
              <td className='px-4 py-3 text-sm text-center'>
                {s.trackingNumber}
              </td>
              <td className='px-4 py-3 text-center'>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${s.shipmentStatus === 'Delivered' ? 'bg-green-100 text-green-800' : s.shipmentStatus === 'In Transit' ? 'bg-yellow-100 text-yellow-800' : s.shipmentStatus === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {s.shipmentStatus}
                </span>
              </td>
              <td className='px-4 py-3 text-sm text-center'>
                {s.eta ? new Date(s.eta).toLocaleDateString() : '-'}
              </td>
              <td className='px-4 py-3 text-sm text-right'>
                ${s.rate?.toFixed(2)}
              </td>
              <td className='px-4 py-3 text-sm text-gray-600 text-center'>
                {new Date(s.createdAt).toLocaleDateString()}
              </td>
              {isAdmin ? (
                <td
                  className='px-4 py-3 text-sm text-right'
                  onClick={(e) => e.stopPropagation()}
                >
                  <ShipmentMenu shipment={s} onRefetch={onRefetch} />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
