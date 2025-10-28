import React, { useEffect, useState } from 'react'

import {db} from '@/service/FirebaseConfig'
import { collection,getDocs,query,where } from 'firebase/firestore'
import {  useNavigation } from 'react-router-dom'
import MyTripCart from './MyTripCart'
import Footer from "@/view-trip/component/Footer";
const MyTrip = () => {
   
const navigation = useNavigation();
const [userTrips,setUserTrips]=useState([]);
  useEffect(()=>{
getUserTrips()

    },[])

  const getUserTrips=async()=>{
    const user = JSON.parse(localStorage.getItem('user'));
   
    if (!user) {
      navigation('/');
      return;
    }

    const q = query(collection(db, "AITrip"), where("userEmail", "==", user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([])
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  setUserTrips(prevVal=>[...prevVal,doc.data()])
});

  }
  return (

    <div className='p-5 md:px-20 lg:px-44 xl:px-56  '>
<h2 className='font-bold text-3xl flex items-center justify-center gap-1.5'>My  <span className="text-red-500">Trips</span>    Plan</h2>
 <hr className="w-45 mx-auto  border-blue-500 rounded mt-1"/>

<div className='grid grid-cols-2 mt-7 md:grid-cols-3 gap-5'>
  {userTrips.length > 0 && 
    // Move last item to the front
    [userTrips[userTrips.length - 1], ...userTrips.slice(0, userTrips.length - 1)].map((trip, idx) => (
      <MyTripCart key={idx} trip={trip} />
    ))
  }
</div>
<Footer/>
    </div>
    
    
  )
}

export default MyTrip