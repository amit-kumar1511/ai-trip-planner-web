import React from 'react'
import HotelCardItem from './HotelCardItem'

const Hotel = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3'> 

            {trip?.tripData?.hotels?.map((hotel,i)=>(
                <HotelCardItem hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}

export default Hotel








