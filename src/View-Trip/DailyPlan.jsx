import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const DailyPlan = ({ trip }) => {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Place to Visit</h2>

            <div>
                {trip?.tripData?.itinerary?.day?.map((item, index) => (
                    <div key={index} >
                        <h2 className='font-medium text-lg mt-6'>{item.day}</h2>
                        <div className='grid  grid-cols-1 md:grid-cols-2 gap-5'>
                            {item?.plan.map((place, index) => (
                                <div key={index} className='mt-5'>
                                    <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default DailyPlan
