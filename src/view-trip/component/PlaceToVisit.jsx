import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlaceToVisit = ({ trip }) => {
  return (
    <div>
      
      <h2 className="font-bold text-xl  mt-15 text-center">Place <span className="text-red-500">To</span> Visit</h2>
      <hr className="w-30 mx-auto border-1 border-blue-500 rounded mt-1"/>
      


      <div>
        {trip.tripData?.itinerary?.map((item, i) => (
          <div className="mt-5">
            <h2 className="font-medium text-lg mb-1">🗓️ Day - {item?.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item?.places?.map((place, i) => (
                <div>
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.visit_time}
                  </h2>

                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceToVisit;
