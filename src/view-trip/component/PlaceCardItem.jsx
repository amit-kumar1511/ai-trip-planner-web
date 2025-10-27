import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { GetPlaceImage } from "@/service/GlobalApi";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
useEffect(() => {
  const fetchPlaceData = async () => {
    const placeName = place.place_name;
    if (!placeName) return;

    const image = await GetPlaceImage(placeName);
    console.log("Place image URL:", image);

    // 🔧 Adjust this line based on what you see in the console
    const url =
      typeof image === "string"
        ? image
        : image?.url || image?.photoUrl || image?.[0]?.url || null;

    setPhotoUrl(url);
  };

  fetchPlaceData();
}, [place.place_name]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.place_name)}`}
      target="_blank"
    >
     <div className="border rounded-xl p-2.5 mt-2 flex flex-col sm:flex-row gap-3 hover:scale-95 transition-all hover:shadow-md cursor-pointer w-full overflow-hidden">
  {/* Image */}
  <div className="w-full lg:w-[160px] sm:w-[250px] md:w-[300px] h-[180px] sm:h-[130px] rounded overflow-hidden bg-gray-200 flex-shrink-0">
    <img
      src={photoUrl || "/placeholder.jpg"}
     
      className="w-full h-full object-cover object-center block"
      onError={(e) => (e.target.src = "/placeholder.jpg")}
    />
  </div>

  {/* Text Content */}
  <div className="flex flex-col justify-between flex-1">
    <h2 className="font-bold text-lg line-clamp-1">{place.place_name}</h2>
    <p className="text-sm text-gray-400 line-clamp-3 sm:line-clamp-3">{place.details}</p>
    <h2 className="text-sm font-medium">⏰ {place.travel_time}</h2>
  </div>
</div>

    </Link>
  );
};

export default PlaceCardItem;
