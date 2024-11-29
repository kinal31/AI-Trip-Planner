import { Button } from '@/components/ui/button'
// import { GetPlaceDetails } from '@/Services/GlobalApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  EmailIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  XIcon
} from 'react-share';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const InfoSection = ({ trip }) => {
  // const [photoUrl, setPhotoUrl] = useState('');

  // useEffect(() => {
  //   // console.log('Trip Object:', trip);
  //   trip?.userSelection?.location && GetPlaceRef()
  // }, [trip]);

  // const GetPlaceRef = async () => {

  //   const BASE_URL = 'https://maps.gomaps.pro/maps/api/place/textsearch/json'

  //   if (!trip?.userSelection?.location) {
  //     console.error('Location is not available');
  //     return;
  //   }
  //   const location = trip.userSelection.location;

  //   try {
  //     const response = await axios.get(`${BASE_URL}`, {
  //       params: {
  //         query: location,
  //         key: import.meta.env.VITE_GOMAP_API_KEY // API key as a query parameter
  //       }
  //     });
  //     console.log(response.data.results[0]);
  //     console.log(response.data.results[0].reference);

  //   } catch (error) {
  //     console.error('Error fetching place details:', error);
  //     throw error; // Rethrow the error for further handling
  //   }
  // }

  // useEffect(() => {
  //   const fetchPhoto = async () => {
  //     const url = await GetPlacePhoto();
  //     setPhotoUrl(url);
  //   };
  //   fetchPhoto();
  // }, []);

  // const GetPlacePhoto = async () => {
  //   const BASE_URL = 'https://maps.gomaps.pro/maps/api/place/photo';
  //   const photoReference = "AdDdOWrePgFoCWO3P3HEJ9XXy443sHjNrkYiH9eMIc8Zcv7gGEFVezLYaAXqTwPioU6CeZotVKpLUFOTaiHwwx7CgTld3vhofKwLKFnToOleVSoAo42Mucc9Djo5pXfMYBUeKRuHuntQl9hUexmAagW9ZoUCJ5Eo85Yb3njHVVfUsDXdYoed"; // Replace with dynamic data
  //   const API_KEY = import.meta.env.VITE_GOMAP_API_KEY;

  //   try {
  //     const response = `${BASE_URL}?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;
  //     console.log('Photo URL:', response);

  //     // Use the URL in your component (e.g., to set an <img> src)
  //     return response;
  //   } catch (error) {
  //     console.error('Error fetching photo:', error);
  //   }
  // };

  const shareUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

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
          {/* <Button className='flex-shrink-0'>
            <IoIosSend />
          </Button> */}


          <Popover>
            <PopoverTrigger> <Button className='flex-shrink-0'>
              <IoIosSend />
            </Button></PopoverTrigger>
            <PopoverContent>
              <div className="flex justify-content-around mb-3 ">
                <FacebookShareButton url={shareUrl} quote="Check out this video!">
                  <FacebookIcon size={35} round />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title="Check out this video!">
                  <XIcon size={35} round />
                </TwitterShareButton>

                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon size={35} round />
                </WhatsappShareButton>

                <EmailShareButton url={shareUrl}>
                  <EmailIcon size={35} round />
                </EmailShareButton>

                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon size={35} round />
                </LinkedinShareButton>

                <RedditShareButton url={shareUrl}>
                  <RedditIcon size={35} round />
                </RedditShareButton>

                <TelegramShareButton url={shareUrl}>
                  <TelegramIcon size={35} round />
                </TelegramShareButton>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={copyToClipboard}
                  className="mt-2 px-4 py-2 border border-gray-700 text-gray-700 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
                >
                  Copy Link
                </button>
              </div>

            </PopoverContent>
          </Popover>

        </div>


      </div>
    </div>
  )
}

export default InfoSection
