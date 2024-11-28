import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
  const [openDailog, setOpenDailog] = useState(false);

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
        setOpenDailog(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    // <div className="p-3 shadow-sm flex justify-between items-center px-5">
    //   <img src="/logo.svg" alt="logo" />
    //   <div>
    //     {
    //       user ?
    //         <div className='flex items-center gap-5'>
    //           <a href="/create-trip">
    //             <Button variant="outline" className="rounded-full text-lg" >+ Create Trip</Button>
    //           </a>
    //           <a href="/mytrip">
    //             <Button variant="outline" className="rounded-full text-lg">My Trips</Button>
    //           </a>              
    //           <Popover>
    //             <PopoverTrigger><img src={user?.picture} alt="profile" className='rounded-full h-[35px] w-[35px] ' /></PopoverTrigger>
    //             <PopoverContent >
    //               <h2 onClick={handleLogout} className='cursor-pointer'>Logout</h2></PopoverContent>
    //           </Popover>

    //         </div> : <Button onClick={() => setOpenDailog(true)}>SignIn</Button>
    //     }
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
      <div className="p-3 shadow-sm flex justify-between items-center px-5 flex-wrap md:flex-nowrap">
        <a href='/'>
          <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] md:w-auto rounded-full" />
        </a>
        <div className="mt-3 md:mt-0 flex flex-wrap justify-center md:justify-end items-center gap-3 md:gap-5">
          {
            user ?
              <div className='flex items-center gap-3 md:gap-5 flex-wrap md:flex-nowrap'>
                <a href="/create-trip">
                  <Button variant="outline" className="rounded-full text-sm md:text-lg">
                    + Create Trip
                  </Button>
                </a>
                <a href="/mytrip">
                  <Button variant="outline" className="rounded-full text-sm md:text-lg">
                    My Trips
                  </Button>
                </a>
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
              <Button onClick={() => setOpenDailog(true)} className="text-sm md:text-base">
                Sign In
              </Button>
          }
        </div>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" alt="" className="w-28 mx-auto" />
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default Header
