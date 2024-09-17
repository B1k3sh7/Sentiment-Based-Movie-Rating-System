import React from 'react'
import Skeleton from 'react-loading-skeleton'

function MovieCardSkeleton({cards}) {

  return (
    Array(cards).fill(0).map((item, key) => {
      return (
        <div key={key}>
          <div className='relative max-w-[180px] max-h-[300px] overflow-hidden shadow-lg group'>
            <Skeleton width="180px" height="260px" className='relative'></Skeleton>
          </div>
          <div className="flex mt-2">
            <h2 className="flex-[0.5">
              <Skeleton />
            </h2>
          </div>
        </div>
      )
    })
  )
}

export default MovieCardSkeleton;