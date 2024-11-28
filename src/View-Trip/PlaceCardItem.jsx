import React from 'react'
import { Link } from 'react-router-dom'

const PlaceCardItem = ({ place }) => {
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>

            <div className='border rounded-xl p-3 mt-2 flex flex-col sm:flex-row gap-3 sm:gap-5 hover:scale-105 transition-all shadow-md cursor-pointer'>
                {/* Image Section */}
                <img
                    src="/place.jpg"
                    alt=""
                    className='h-[100px] sm:h-[130px] w-[100px] sm:w-[130px] rounded-xl mx-auto sm:mx-0'
                />

                {/* Text Content Section */}
                <div className='flex flex-col justify-between flex-1'>
                    <div>
                        <h2 className='text-base sm:text-lg font-bold'>{place.placeName}</h2>
                        <p className='text-xs sm:text-sm text-gray-400'>{place.placeDetails}</p>
                        <h2 className='text-sm sm:text-base'>⭐ {place.rating}</h2>
                    </div>
                    <h2 className='mt-2 text-sm sm:text-base'>{place.ticketPricing}</h2>
                </div>
            </div>

        </Link>
    )
}

export default PlaceCardItem
