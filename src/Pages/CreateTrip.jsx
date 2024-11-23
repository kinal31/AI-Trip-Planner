import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { useJsApiLoader } from "@react-google-maps/api";


const CreateTrip = () => {
  const [place, setPlace] = useState();
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_PLACE_API_KEY, // Use your API key
  //   libraries: ["places"], // Load the Places library
  // });

  // if (!isLoaded) {
  //   return <div>Loading...</div>; // Show a loading state until the script is ready
  // }
  console.log(import.meta.env.VITE_GOOGLE_PLACE_API_KEY);
  
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>

        <div>
          <h2 className='text-xl my-3 font-medium '>What is destination of choice?</h2>
        
          <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}  
            selectProps={{
            place,
            onChange: (value) => {setPlace(value); console.log(value); },
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input type='number' placeholder='Ex:3' />
        </div>

      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your budget for this trip?</h2>
      </div>
    </div>
  )
}

export default CreateTrip
