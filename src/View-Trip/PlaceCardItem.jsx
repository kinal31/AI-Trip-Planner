import React from 'react'
import { Link } from 'react-router-dom'

const PlaceCardItem = ({ place }) => {
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>

            <div className='border rounded-xl p-3 mt-2 flex flex-col sm:flex-row gap-5 hover:scale-105 transition-all shadow-md cursor-pointer '>
                <img src="/placeholder.jpg" alt="" className='h-[130px] w-[130px] rounded-xl ' />
                <div>
                    <h2 className='text-lg font-bold'>{place.placeName}</h2>
                    <p className='text-sm text-gray-400'>{place.placeDetails}</p>
                    <h2>⭐ {place.rating}</h2>
                    <h2 className='mt-2'>{place.ticketPricing}</h2>
                    <button></button>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem
