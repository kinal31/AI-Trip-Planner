import { db } from '@/Services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripCardItem from './UserTripCardItem';
import { Helmet } from 'react-helmet';

const MyTrips = () => {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips()
    }, [])

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
            return;
        }
        setUserTrips([]);
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email))
        const querySnapshot = await getDocs(q);
        
        const tripsData = querySnapshot.docs.map(doc => doc.data());

        // Now set the state with the collected data
        setUserTrips(tripsData);
    }

    return (
        <>
        <Helmet>
             <title>My Trips - AI Trip Planner</title>
                <meta 
                    name="description" 
                    content="View and manage all your saved trips in one place with AI Trip Planner. Start planning your next adventure today!" 
                />
        </Helmet>
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-10'>
                {userTrips?.length>0 ? userTrips.map((trip, index) => (
                    <UserTripCardItem trip={trip} key={`${trip.id}-${trip.userSelection?.location}-${index}`} />
                )) 
                : [1,2,3,4,5,6].map((item,index) => (
                    <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'> </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default MyTrips
