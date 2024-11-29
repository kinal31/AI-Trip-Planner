import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../Constants/Option';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/Services/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '../Services/firebaseConfig';
import { useNavigate } from 'react-router-dom';



const CreateTrip = () => {
  const [formData, setFormData] = useState([])

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = "https://maps.gomaps.pro/maps/api/place/autocomplete/json";
  const API_KEY = import.meta.env.VITE_GOMAP_API_KEY;

  const fetchSuggestions = async (value) => {
    if (value.length > 0) {
      try {
        const response = await axios.get(API_URL, {
          params: {
            input: value,
            key: API_KEY,
          },
        });
        setSuggestions(response.data.predictions || []);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);

  };

  const handleSelect = (suggestion) => {
    setInputValue(suggestion.description);
    handleInputChange('location', suggestion.description);
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      handleSelect(suggestions[activeSuggestionIndex]);
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const handleBlur = () => {
    // Close the dropdown after a small delay to allow click to register
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    // onSuccess:(codeResp) => console.log(codeResp),
    onError: (err) => console.error(err)

  });

  const onGenrateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDailog(true);
    }
    if (formData?.noOfDay > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details")
      return;
    }
    // console.log(formData);
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDay}', formData?.noOfDay)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDay}', formData?.noOfDay)

    // console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result?.response?.text());
    setLoading(false);
    SaveAITrip(result?.response?.text());
  };

  const SaveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), { //db, collection, document
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId)
  }

  const getUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setOpenDailog(false);
        onGenrateTrip();
      })
      .catch((error) => console.error(error));
  };


  return (

    // <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
    //   <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
    //   <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

    //   <div className='mt-20 flex flex-col gap-10'>

    //     <div>
    //       <h2 className='text-xl my-3 font-medium '>What is destination of choice?</h2>

    //       <div style={{ position: "relative" }}>
    //         <Input
    //           type="text"
    //           value={inputValue}
    //           onChange={handleChange}
    //           onKeyDown={handleKeyDown}
    //           onBlur={handleBlur}
    //           placeholder="Search places..."
    //           style={{
    //             width: "100%",
    //             padding: "10px",
    //             boxSizing: "border-box",
    //           }}
    //         />
    //         {isDropdownOpen && suggestions.length > 0 && (
    //           <ul
    //             style={{
    //               position: "absolute",
    //               top: "100%",
    //               left: 0,
    //               right: 0,
    //               border: "1px solid #ccc",
    //               backgroundColor: "#fff",
    //               listStyle: "none",
    //               margin: 0,
    //               padding: 0,
    //               zIndex: 1000,
    //               maxHeight: "200px",
    //               overflowY: "auto",
    //             }}
    //           >
    //             {suggestions.map((suggestion, index) => (
    //               <li
    //                 key={suggestion.place_id}
    //                 onClick={() => handleSelect(suggestion)}
    //                 style={{
    //                   padding: "10px",
    //                   cursor: "pointer",
    //                   backgroundColor:
    //                     index === activeSuggestionIndex ? "#f0f0f0" : "#fff",
    //                 }}
    //               >
    //                 <strong>
    //                   {suggestion.description.substring(
    //                     0,
    //                     inputValue.length
    //                   )}
    //                 </strong>
    //                 {suggestion.description.substring(inputValue.length)}
    //               </li>
    //             ))}
    //           </ul>
    //         )}
    //       </div>
    //     </div>

    //     <div>
    //       <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
    //       <Input type='number' placeholder='Ex:3' onChange={(e) => handleInputChange('noOfDay', e.target.value)} />
    //     </div>

    //     <div>
    //       <h2 className='text-xl my-3 font-medium'>What is Your budget?</h2>
    //       <div className='grid grid-cols-3 gap-5 mt-5'>
    //         {SelectBudgetOptions.map((item, index) => {
    //           return (
    //             <div key={index}
    //               onClick={() => handleInputChange('budget', item.title)}
    //               className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
    //               <h2 className='text-4xl'>{item.icon}</h2>
    //               <h2 className='font-bold text-lg'>{item.title}</h2>
    //               <h2 className='text-sm text-gray-500'>{item.desc}</h2>
    //             </div>
    //           );
    //         })}
    //       </div>

    //     </div>

    //     <div>
    //       <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
    //       <div className='grid grid-cols-3 gap-5 mt-5'>
    //         {SelectTravelesList.map((item, index) => {
    //           return (
    //             <div key={index}
    //               onClick={() => handleInputChange('traveler', item.people)}
    //               className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
    //               <h2 className='text-4xl'>{item.icon}</h2>
    //               <h2 className='font-bold text-lg'>{item.title}</h2>
    //               <h2 className='text-sm text-gray-500'>{item.desc}</h2>
    //             </div>
    //           );
    //         })}
    //       </div>

    //     </div>

    //   </div>

    //   <div className='my-10 flex justify-end'>
    //     <Button  disabled={loading} onClick={onGenrateTrip} >
    //     {loading ? <AiOutlineLoading3Quarters  className='h-7 w-7 animate-spin'/>:'Generate Trip '}</Button>
    //   </div>

    //   <Dialog open={openDailog} >

    //     <DialogContent>
    //       <DialogHeader>

    //         <DialogTitle></DialogTitle>
    //         <DialogDescription>
    //           <img src="/logo.svg" alt="" />
    //           <h2 className='font-bold text-lg mt-7 '>Sign In With Google </h2>
    //           <span>Sign in to the app with your Google authentication securely </span>

    //           <Button className='w-full mt-5 flex gap-4 items-center' onClick={login}>
    //             <FcGoogle className='h-7 w-7' /> Sign In With Google</Button>
    //         </DialogDescription>
    //       </DialogHeader>
    //     </DialogContent>
    //   </Dialog>

    // </div>
    <>
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='font-bold text-2xl sm:text-3xl text-center sm:text-left'>
          Tell us your travel preferences 🏕️🌴
        </h2>
        <p className='mt-3 text-gray-500 text-lg sm:text-xl text-center sm:text-left'>
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>

        <div className='mt-20 flex flex-col gap-10'>

          {/* Destination Input */}
          <div>
            <h2 className='text-lg sm:text-xl my-3 font-medium text-center sm:text-left'>
              What is your destination of choice?
            </h2>

            <div style={{ position: "relative" }}>
              <Input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Search places..."
                style={{
                  width: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              />
              {isDropdownOpen && suggestions.length > 0 && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    zIndex: 1000,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion.place_id}
                      onClick={() => handleSelect(suggestion)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        backgroundColor:
                          index === activeSuggestionIndex ? "#f0f0f0" : "#fff",
                      }}
                    >
                      <strong>
                        {suggestion.description.substring(0, inputValue.length)}
                      </strong>
                      {suggestion.description.substring(inputValue.length)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Number of Days Input */}
          <div>
            <h2 className='text-lg sm:text-xl my-3 font-medium text-center sm:text-left'>
              How many days are you planning your trip?
            </h2>
            <Input type='number' placeholder='Ex: 3' onChange={(e) => handleInputChange('noOfDay', e.target.value)} />
          </div>

          {/* Budget Selection */}
          <div>
            <h2 className='text-lg sm:text-xl my-3 font-medium text-center sm:text-left'>
              What is your budget?
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange('budget', item.title)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget === item.title && 'shadow-lg border-black'
                    }`}
                >
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Companion Selection */}
          <div>
            <h2 className='text-lg sm:text-xl my-3 font-medium text-center sm:text-left'>
              Who do you plan on traveling with?
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange('traveler', item.people)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler === item.people && 'shadow-lg border-black'
                    }`}
                >
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className='my-10 flex justify-center sm:justify-end'>
          <Button disabled={loading} onClick={onGenrateTrip} className='w-full sm:w-auto'>
            {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
          </Button>
        </div>

        {/* Google Dialog */}
        <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <img src="/logo.svg" alt="" />
                <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                <span>Sign in to the app with your Google authentication securely</span>
                <Button className='w-full mt-5 flex gap-4 items-center' onClick={login}>
                  <FcGoogle className='h-7 w-7' /> Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

    </>
  )
}

export default CreateTrip
