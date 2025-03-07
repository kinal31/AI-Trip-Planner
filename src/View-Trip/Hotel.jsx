import React from 'react'
import { Link } from 'react-router-dom'

const HotelImage = [
  {
    "id": 1,
    "image": "/Hotel 1.jpg"
  },
  {
    "id": 2,
    "image": "/Hotel 2.jpg"
  },
  {
    "id": 3,
    "image": "/Hotel 3.jpg"
  },
]

const Hotel = ({ trip }) => {
  return (
    <div>
      <h2 className='font-bold text-xl my-5'>Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>

        {trip?.tripData?.hotels.map((hotel, index) => (
          <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + ',' + hotel.hotelAddress} target='_blank' key={index}>
            <div key={index} className='hover:scale-105 transition-all cursor-pointer' >

              <img
                src={HotelImage[index]?.image || "/placeholder.jpg"}
                alt={hotel.hotelName}
                className="rounded-xl"
              />


              <div className='my-2 '>
                <h2 className='font-medium'>{hotel.hotelName.startsWith("Hotel Name ") ? (
                  <span>
                    Check On Google Map!
                  </span>
                ) : (
                  <span>{hotel.hotelName}</span>
                )}</h2>
                <h2 className='text-xs '>📍 {hotel.hotelAddress}</h2>
                <h2 className='text-xs text-gray-400'> {hotel.description}</h2>
                {/* <h2 className='text-xs text-gray-500'> {hotel.rating}</h2> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotel
