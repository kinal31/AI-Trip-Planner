import { db } from '@/Services/firebaseConfig';
import DailyPlan from '@/View-Trip/DailyPlan';
import Hotel from '@/View-Trip/Hotel';
import InfoSection from '@/View-Trip/InfoSection';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

const ViewTrip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    // Read data from firebase
    const GetTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log(docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log('No such document!');
            toast("No trip found")
        }
    }

    useEffect(() =>{
        tripId && GetTripData();
    },[tripId]);

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended hotel  */}
            <Hotel trip={trip} />
            {/* Daily plan */}
            <DailyPlan trip={trip} />
            
        </div>
    )
}

export default ViewTrip
