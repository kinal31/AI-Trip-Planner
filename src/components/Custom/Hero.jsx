import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

const Hero = () => {
  return (
    
    <>
      {/* <div className='flex flex-col items-center mx-auto px-5 lg:px-10 xl:mx-56 gap-6 md:gap-9'>
        <h1 className='font-extrabold text-[30px] md:text-[40px] lg:text-[50px] text-center mt-10 md:mt-16'>
          <span className='text-[#81A5D1]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
        </h1>
        <p className='text-base md:text-lg lg:text-xl text-gray-500 text-center'>
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget
        </p>

        <Link to={'/create-trip'}>
          <Button className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3">Get Started, It's Free!</Button>
        </Link>

        <div>
          <img
            src="/Homepage-image.jpg"
            alt="homepage-image"
            className='h-[250px] md:h-[300px] lg:h-[400px] shadow-2xl hover:scale-105 transition-all'
          />

          <div className='text-[#81A5D1] flex items-center mt-10 justify-center text-2xl'>
            <FaQuoteLeft className='mr-2' /> Plan Your Dream Trip Today! <FaQuoteRight className='ml-2' />
          </div>

        </div>
      </div> */}
      <div className='flex flex-col items-center mx-auto px-5 lg:px-10 xl:mx-56 gap-6 md:gap-9'>
        <h1 className='font-extrabold text-[30px] md:text-[40px] lg:text-[50px] text-center mt-10 md:mt-16'>
          <span className='text-[#81A5D1]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
        </h1>
        <p className='text-base md:text-lg lg:text-xl text-gray-500 text-center'>
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget
        </p>

        <Link to={'/create-trip'}>
          <Button className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3">Get Started, It's Free!</Button>
        </Link>

        <div>
          <img
            src="/Homepage-image.jpg"
            alt="homepage-image"
            className='h-[250px] md:h-[300px] lg:h-[400px] shadow-2xl hover:scale-105 transition-all max-w-full mx-auto'
          />

          <div className='text-[#81A5D1] flex items-center mt-10 justify-center text-lg'>
            <FaQuoteLeft className='mr-2' /> Plan Your Dream Trip Today! <FaQuoteRight className='ml-2' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
