import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
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
import { Helmet } from 'react-helmet';



const CreateTrip = () => {
  const [formData, setFormData] = useState([])
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

   
    <>
      <Helmet>
        <title>Create a Trip - AI Trip Planner </title>
        <meta name="description" content="Easily create and manage your trips with AI Trip Planner." />
      </Helmet>

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
            <Input 
              type="text" 
              placeholder="Enter your destination" 
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
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