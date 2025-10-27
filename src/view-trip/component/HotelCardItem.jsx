import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { GetPlaceImage } from "@/service/GlobalApi";

const HotelCardItem = ({hotel}) => {


        const [photoUrl, setPhotoUrl] = useState(null);
        useEffect(() => {
          const fetchPlaceData = async () => {
            const placeName = hotel.hotel_name;
            if (!placeName) return;
        
            const image = await GetPlaceImage(placeName);
            // console.log("Place image URL:", image);
        
            // 🔧 Adjust this line based on what you see in the console
            const url =
              typeof image === "string"
                ? image
                : image?.url || image?.photoUrl || image?.[0]?.url || null;
        
            setPhotoUrl(url);
          };
        
          fetchPlaceData();
        }, [hotel.hotel_name]);




  return (
      <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.hotel_name +"," + hotel?.address} target='_blank'>
     
                <div className='border rounded-xl p-2 hover:scale-105 transition-all cursor-pointer '>
    <div className="w-full lg:w-[194px] sm:w-[250px] md:w-[300px] h-[100px] sm:h-[130px] rounded overflow-hidden bg-gray-200 flex-shrink-0">
                   <img
      src={photoUrl || "/placeholder.jpg"}
     
      className="w-full h-full object-cover object-center block"
      onError={(e) => (e.target.src = "/placeholder.jpg")}
    />
       </div>          
    
    
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className={`font-medium `}>{hotel.hotel_name}</h2>
                        <h2 className='text-sm font-medium text-gray-500 line-clamp-2'>📍 {hotel.address}</h2>
    
                        <div className='flex justify-between items-center'>
                        <h2 className='text-sm'>💸 {hotel.price_per_night}</h2>
                        <h2 className='text-sm'>⭐ {hotel.rating}</h2>
                        </div>
                    </div>
                </div>
                </Link>
  )
}

export default HotelCardItem