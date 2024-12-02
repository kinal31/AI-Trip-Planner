import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {  NavLink } from 'react-router-dom';


const Header = () => {
  // const [openDailog, setOpenDailog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    window.location.reload();
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    // onSuccess:(codeResp) => console.log(codeResp),
    onError: (err) => console.error(err)

  });

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
        setIsOpen(false);
      })
      .catch((error) => console.error(error));
  };

  // const handleCloseDialog = () => {
  //   setOpenDailog(false); // Close the dialog by setting the state to false
  // };

  return (

    <>
      <div className="p-3 shadow-sm flex justify-between items-center px-5 flex-wrap md:flex-nowrap">
        <NavLink to={'/'}>
          <img src="/logo.png" alt="logo" className="w-[50px] h-[50px]  md:w-[80px] md:h-[80px] rounded-full cursor-pointer" />
        </NavLink>
        <div className="mt-3 md:mt-0 flex flex-wrap justify-center md:justify-end items-center gap-3 md:gap-5">
          {
            user ?
              <div className='flex items-center gap-3 md:gap-5 flex-wrap md:flex-nowrap'>
                <NavLink to={"/create-trip"}>
                  <Button variant="outline" className="rounded-full text-sm md:text-lg">
                    + Create Trip
                  </Button>
                </NavLink>
                <NavLink to={"/mytrip"}>
                  <Button variant="outline" className="rounded-full text-sm md:text-lg">
                    My Trips
                  </Button>
                </NavLink>
                <Popover>
                  <PopoverTrigger>
                    <img src={user?.picture} alt="profile" className="rounded-full h-8 w-8 md:h-[35px] md:w-[35px]" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <h2 onClick={handleLogout} className="cursor-pointer">
                      Logout
                    </h2>
                  </PopoverContent>
                </Popover>
              </div> :
              <Button onClick={openModal} className="text-sm md:text-base">
                Sign In
              </Button>
          }
      </div>
    </div >

       {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
            {/* Modal Header */}
            <div className="flex justify-end items-center  pb-3">
            
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 text-lg font-bold"
              >
                &times; {/* Close Button */}
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4">
            <img src="/logo.png" alt="" className="w-28 mx-auto" />
              <h2 className="font-bold text-base md:text-lg mt-5 md:mt-7 text-center">
                Sign In With Google
              </h2>
              <span className="block text-sm md:text-base text-center">
                Sign in to the app with your Google authentication securely
              </span>
              <Button className="w-full mt-4 md:mt-5 flex gap-4 items-center justify-center" onClick={login}>
                <FcGoogle className="h-6 w-6 md:h-7 md:w-7" />
                Sign In With Google
              </Button>
            </div>

         
          </div>
        </div>
      )}

    </>
  )
}

export default Header
