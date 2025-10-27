import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {doc,getDoc} from 'firebase/firestore'
import { db } from '@/service/FirebaseConfig'
import toast from 'react-hot-toast'
import InfoSection from '../component/InfoSection'
import Hotel from '../component/Hotel'
import PlaceToVisit from '../component/PlaceToVisit'
import Footer from '../component/Footer'


const TripView = () => {
  const {tripId} = useParams();
  const [trip,setTrip] = useState([]);


  useEffect(()=>{
    tripId&&GetTripdata();
  },[tripId])

  //trip information from firebase 
  const GetTripdata =async()=>{
    const docref = doc(db,'AITrip',tripId);
    const docSnap =await getDoc(docref)
    if (docSnap.exists()) {
      console.log("Document:",docSnap.data());
      setTrip(docSnap.data())
      
    }else{
      console.log("No such Document");
      toast("No Trip Found")
      
    }

  }
  return (
    <div className='p-5 md:px-20 lg:px-44 xl:px-56 '>
     
      {/* information section */}

    <InfoSection trip={trip}/>
   

      {/* recommendedd Hotels */}
 <Hotel trip={trip}/>
      {/* daily plans */}
<PlaceToVisit trip={trip}/>
      {/* footer */}
      <Footer trip={trip}/>
    </div>
  )
}

export default TripView