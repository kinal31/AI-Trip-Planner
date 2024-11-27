import { Button } from '@/components/ui/button'
// import { GetPlaceDetails } from '@/Services/GlobalApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    // console.log('Trip Object:', trip);
    trip?.userSelection?.location && GetPlaceRef()
  }, [trip]);

  const GetPlaceRef = async () => {

    const BASE_URL = 'https://maps.gomaps.pro/maps/api/place/textsearch/json'

    if (!trip?.userSelection?.location) {
      console.error('Location is not available');
      return;
    }
    const location = trip.userSelection.location;

    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          query: location,
          key: import.meta.env.VITE_GOMAP_API_KEY // API key as a query parameter
        }
      });
      console.log(response.data.results[0]);
      console.log(response.data.results[0].reference);

    } catch (error) {
      console.error('Error fetching place details:', error);
      throw error; // Rethrow the error for further handling
    }
  }

  useEffect(() => {
    const fetchPhoto = async () => {
      const url = await GetPlacePhoto();
      setPhotoUrl(url);
    };
    fetchPhoto();
  }, []);
  
  const GetPlacePhoto = async () => {
    const BASE_URL = 'https://maps.gomaps.pro/maps/api/place/photo';
    const photoReference = "AdDdOWrePgFoCWO3P3HEJ9XXy443sHjNrkYiH9eMIc8Zcv7gGEFVezLYaAXqTwPioU6CeZotVKpLUFOTaiHwwx7CgTld3vhofKwLKFnToOleVSoAo42Mucc9Djo5pXfMYBUeKRuHuntQl9hUexmAagW9ZoUCJ5Eo85Yb3njHVVfUsDXdYoed"; // Replace with dynamic data
    const API_KEY = import.meta.env.VITE_GOMAP_API_KEY;

    try {
      const response = `${BASE_URL}?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;
      console.log('Photo URL:', response);

      // Use the URL in your component (e.g., to set an <img> src)
      return response;
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  
  return (
    <div>
      {/* <img src="/placeholder.jpg" alt="Header Image" className='h-[340px] w-full object-cover rounded-xl' /> */}
      {photoUrl ? (
        <img src={photoUrl} alt="Place" className="h-[340px] w-full object-cover rounded-xl" />
      ) : (
        <img src="/placeholder.jpg" alt="Placeholder" className="h-[340px] w-full object-cover rounded-xl" />
      )}

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
