import React from "react";
import Ccard from "./Ccard";

const About = ({icon, title, description}) => {
  return (
    <div>
   <h1 className="text-2xl font-bold mb-10">Why Choose AI Trip Plan ?</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5 mt-5">
     

      <Ccard
        icon="✈️"
        title="AI-Powered Itineraries"
        description="Customized travel plans created by advanced AI"
      />
      <Ccard
        icon="🏨"
        title="Accommodation Finder"
        description="Find the perfect stay for your budget and preferences"
      />

      <Ccard
        icon="🗺️"
        title="Interactive Maps"
        description="Visualize your trip with detailed, interactive maps"
      />

      <Ccard
        icon="🤝"
        title="Group Planning"
        description="Collaborate with friends and family on trip details"
      />
      
    </div>

     <div>
        <h1 className="text-2xl font-bold mt-10 mb-5">What Our Users Say ?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">

        <div className="p-2 sm:p-4 border cursor-pointer rounded-lg hover:shadow-lg border-black shadow-lg">
            <p>"The personalized recommendations were fantastic. It felt like having a local guide!"</p>
            <div className="flex mt-6 items-center justify-between">
                <h2 className=" font-medium">- Shantanu</h2>
                <h2>⭐⭐⭐⭐⭐</h2>
            </div>
            
        </div>

         <div className="p-2 sm:p-4 border cursor-pointer rounded-lg hover:shadow-lg border-black shadow-lg">
            <p>"AI Trip Planner made organizing my Europe tour a breeze! Highly recommended!"</p>
            <div className="flex mt-6 items-center justify-between">
                <h2 className=" font-medium">- Bholu</h2>
                <h2>⭐⭐⭐⭐⭐</h2>
            </div>
        </div>

         <div className="p-2 sm:p-4 border cursor-pointer rounded-lg hover:shadow-lg border-black shadow-lg">
            <p>"I was skeptical at first, but the AI-generated itinerary was spot on. Saved me hours of planning."</p>
            <div className="flex mt-6 items-center justify-between">
                <h2 className=" font-medium">- Prince</h2>
                <h2>⭐⭐⭐⭐⭐</h2>
            </div>
        </div>

         <div className="p-2 sm:p-4 border cursor-pointer rounded-lg hover:shadow-lg border-black shadow-lg">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tempore dolores quia at beatae, adipisci culpa ut quam eveniet praesentium?</p>
            <div className="flex mt-6 items-center justify-between">
                <h2 className=" font-medium">- Ashish</h2>
                <h2>⭐⭐⭐⭐⭐</h2>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default About;
