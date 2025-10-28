import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";


import About from "./About";
import Footer from "@/view-trip/component/Footer";

const Hero = (props) => {
  return (
    <div className="bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="flex flex-col items-center mx-4 sm:mx-8 md:mx-20 lg:mx-56 gap-6 md:gap-9 text-center px-2">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] mt-12 md:mt-16 leading-tight">
          <span className="text-[#f56551]">
            Discover Your Next Adventure with AI:
          </span>{" "}
          Personalized itineraries at your fingertips
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-1000 max-w-2xl ">
          Your personal trip planner and travel curator, creating custom trip
          plans tailored to your interests and budget.
        </p>

        <Link to="/create-trip">
          <Button className=" hover:scale-95 transition-all mt-4 cursor-pointer text-sm sm:text-base px-6 py-6 rounded-full shadow-md hover:shadow-lg ">
            Get Started - It’s Free
          </Button>
        </Link>
        <About/>
        <Footer/>
      </div>
    </div>
  );
};

export default Hero;
