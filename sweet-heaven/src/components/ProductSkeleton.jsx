import React from 'react'

const ProductSkeleton = () => {
  return (
    <div className='skeleton-card rounded-lg shadow p-4 bg-white'>
      <div className='skeleton shimmer h-48 rounded mb-4'></div>
      <div className='skeleton shimmer h-4 rounded w-3/4 mb-2'></div>
      <div className='skeleton shimmer h-4 rounded w-1/2'></div>
    </div>
  )
}

export default ProductSkeleton
