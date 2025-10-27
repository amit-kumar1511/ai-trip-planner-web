import React, { useEffect ,useState } from 'react'
import { Button } from '@/components/ui/button'
import { IoIosSend } from "react-icons/io";

import { GetPlaceDetails, GetPlaceImage } from "@/service/GlobalApi"

const InfoSection = ({trip}) => {
const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
      
    const fetchPlaceData = async () => {
      const placeName = trip?.userSelection?.location?.label;
      if (!placeName) return;

      // Get place details (coordinates, etc.)
      const place = await GetPlaceDetails(placeName);
      // console.log("Place details:", place);

      // Get place image
      const image = await GetPlaceImage(placeName);
      // console.log("Place image URL:", image);
      setPhotoUrl(image);
    };

    fetchPlaceData();
  }, [trip]);
    
  return (
    <>
    <div >
    <img 
  src={photoUrl} 
 
  className=" max-w-full rounded-xl object-cover object-center w-full h-[200px] sm:h-[350px]"
/>


        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl '>{trip?.userSelection?.location?.label}</h2>
            
         <div className="flex flex-wrap gap-3 md:gap-5 justify-center md:justify-start">
            <h2 className="p-1.5 px-3 bg-gray-200 rounded-full text-gray-600 text-xs sm:text-sm md:text-base font-semibold">
              📆 {trip?.userSelection?.noOfDays || 0} Day
            </h2>
            <h2 className="p-1.5 px-3 bg-gray-200 rounded-full text-gray-600 text-xs sm:text-sm md:text-base font-semibold">
              💸 {trip?.userSelection?.budget || "N/A"} Budget
            </h2>
            <h2 className="p-1.5 px-3 bg-gray-200 rounded-full text-gray-600 text-xs sm:text-sm md:text-base font-semibold">
              🥂 Travelers: {trip?.userSelection?.traveler || 0} People
            </h2>
          </div>
        </div>

        <Button><IoIosSend /></Button>
        </div>
    </div>
    </>
  )
}

export default InfoSection