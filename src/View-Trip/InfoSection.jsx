import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  return (
    <div>
      <img src="/placeholder.jpg" alt="Header Image" className='h-[340px] w-full object-cover rounded-xl' />

      <div className='py-5 flex flex-col gap-3'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>

      
        <div className='flex flex-wrap justify-between items-center gap-4'>
          
          {/* Left Section */}
          <div className='flex flex-wrap gap-3'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'>
              📅 {trip?.userSelection?.noOfDay} Days
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'>
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'>
              🥂 No. Of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>

          {/* Right Section */}
          <Button className='flex-shrink-0'>
            <IoIosSend />
          </Button>
        </div>


      </div>
    </div>
  )
}

export default InfoSection
