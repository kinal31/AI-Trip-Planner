import React, { useEffect, useState, useRef } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

// Import Firebase SDK components
// Ensure you have firebase installed: npm install firebase
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { app } from '@/Services/firebaseConfig';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [appCheckInitialized, setAppCheckInitialized] = useState(false);
  const captchaRef = useRef(null);
  const captchaContainerRef = useRef(null);

  // Initialize Firebase and App Check when component mounts
  useEffect(() => {
   

    // In development mode, uncomment this line to get debug tokens
    // window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

    // Initialize App Check
    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6Lei8iYrAAAAANsRnGtyWn8ULtwuCvzyZuXr6lUc'),
      isTokenAutoRefreshEnabled: true
    });

    setAppCheckInitialized(true);
    console.log("Firebase App Check initialized");
  }, []);

  const openModal = () => {
    setIsOpen(true);
    // Initialize reCAPTCHA when modal opens
    setTimeout(() => {
      initRecaptcha();
    }, 100);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setCaptchaVerified(false);
    setCaptchaToken(null);
  };
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
    
    // Load the reCAPTCHA script when component mounts
    const loadRecaptchaScript = () => {
      if (!window.grecaptcha && !document.querySelector('#google-recaptcha-script')) {
        const script = document.createElement('script');
        script.id = 'google-recaptcha-script';
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    };
    
    loadRecaptchaScript();
    
    // Clean up function
    return () => {
      const script = document.querySelector('#google-recaptcha-script');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [user]);

  const initRecaptcha = () => {
    if (window.grecaptcha && captchaContainerRef.current) {
      // Reset container
      captchaContainerRef.current.innerHTML = '';
      
      // Render reCAPTCHA
      captchaRef.current = window.grecaptcha.render(captchaContainerRef.current, {
        'sitekey': '6LcqPycrAAAAACV2u_ivffVyMma7klWDnsNcsyhG', // Your existing reCAPTCHA site key
        'callback': onCaptchaVerified,
        'expired-callback': onCaptchaExpired
      });
    } else {
      // If grecaptcha is not loaded yet, try again after a short delay
      setTimeout(initRecaptcha, 500);
    }
  };

  const onCaptchaVerified = (token) => {
    setCaptchaVerified(true);
    setCaptchaToken(token);
  };

  const onCaptchaExpired = () => {
    setCaptchaVerified(false);
    setCaptchaToken(null);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    navigate('/');
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      if (captchaVerified && appCheckInitialized) {
        getUserProfile(codeResp);
      } else if (!captchaVerified) {
        alert("Please complete the reCAPTCHA verification first");
      } else if (!appCheckInitialized) {
        alert("App verification is initializing. Please try again in a moment.");
      }
    },
    onError: (err) => console.error(err)
  });

  const getUserProfile = (tokenInfo) => {
    // You could send the captchaToken to your backend for verification if needed
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
        setCaptchaVerified(false);
        setCaptchaToken(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="p-3 shadow-sm flex justify-between items-center px-5 flex-wrap md:flex-nowrap">
        <NavLink to={'/'}>
          <img src="/logo.png" alt="logo" className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full cursor-pointer" />
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
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
            {/* Modal Header */}
            <div className="flex justify-end items-center pb-3">
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
              <span className="block text-sm md:text-base text-center mb-4">
                Sign in to the app with your Google authentication securely
              </span>
              
              {/* reCAPTCHA Container */}
              <div className="flex justify-center mb-4">
                <div ref={captchaContainerRef} id="recaptcha-container"></div>
              </div>
              
              <Button 
                className="w-full mt-4 md:mt-5 flex gap-4 items-center justify-center" 
                onClick={login}
                disabled={!captchaVerified || !appCheckInitialized}
              >
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