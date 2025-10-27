import React, { useEffect, useState } from "react";

import { GetPlaceDetails, GetPlaceImage } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

const MyTripCart = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const fetchPlaceData = async () => {
      const placeName = trip.userSelection.location.label;
      if (!placeName) return;

      try {
        const place = await GetPlaceDetails(placeName);
        //   console.log("Place details:", place);

        const image = await GetPlaceImage(placeName);
        //   console.log("Place image result:", image);

        if (typeof image === "string") {
          setPhotoUrl(image);
        } else if (image?.url) {
          setPhotoUrl(image.url);
        } else {
          console.warn("No valid image URL found.");
        }
      } catch (err) {
        console.error("Error fetching place data:", err);
      }
    };

    fetchPlaceData();
  }, [trip]);

  return (
    <Link
      to={"/view-trip/" + trip.id}
      onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
    >
      <div className="hover:shadow-md border rounded-xl p-2 hover:scale-105 transition-all cursor-pointer">
        <div className="w-full sm:w-[290px] md:w-[130px] lg:w-[218px] xl:w-[268px] h-[160px] sm:h-[200px] md:h-[220px] lg:h-[240px] rounded-xl overflow-hidden bg-gray-200 flex-shrink-0 transition-all">
          <img
            src={photoUrl || "/placeholder.jpg"}
            className="w-full h-full object-cover object-center "
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
        </div>

        <div className="">
          <h2 className="font-bold mt-2 text-lg line-clamp-1 lg:line-clamp-1">
            {trip.userSelection.location.label}
          </h2>
          <h2 className="text-sm font-medium text-gray-500">
            {trip?.userSelection?.noOfDays} Days Trip With{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default MyTripCart;
