import { useEffect, useState,useRef } from "react";
import React from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { SelectTravelsList, SelectBudgetOptions} from "/src/constants/option.jsx";
import { Button } from '../components/ui/button'
import  toast  from "react-hot-toast";
import { AI_PROMPT } from "@/constants/option";
import { chatSession } from "@/service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../components/custom/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const createTrip = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState({});
  const [selected, setSelected] = useState(false); // track selection
  const [loading, setLoading] = useState(false);
  const [loadings , setLoadings] = useState(false)
  const [formData , setFormData] = useState({});
  const debounceRef = useRef(null);
  const [openDialog , setOpenDialog] =useState(false);
   
  const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
 const navigate = useNavigate();
 
 
const handleInputChange = (name,value)=>{ 
 
  setFormData({ 
    ...formData, [name]:value
   })
 }

useEffect(()=>{
console.log(formData);
},[formData])

const login = useGoogleLogin({
  onSuccess:(codeResp)=>GetUserProfile(codeResp),
  onError:(error)=>console.log(error)
  
  
})



const onGgenerateTrip = async()=>{

  const user = localStorage.getItem('user')
  
  if (!user) {
    setOpenDialog(true)
    return;
  }


   if(formData?.noOfDays>5 || !formData?.location || !formData?.budget || !formData?.traveler){
    toast.error("Number of days cannot be more than 5!");
    return;
   
  }
  setLoadings(true)
  const FINAL_PROMPT=AI_PROMPT
  .replace('{location}',formData.location.label)
  .replace('{totalDays}',formData?.noOfDays)
  .replace('{traveler}',formData?.traveler)
  .replace('{budget}',formData?.budget)
  // console.log(FINAL_PROMPT)

const result= await chatSession.sendMessage(FINAL_PROMPT);
console.log(result?.response?.text());
setLoadings(false)
saveAiTrip(result?.response?.text())

}



const GetUserProfile=(tokenInfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
    {
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:`Application/json`
      }
    }).then((resp)=>{
    console.log(resp)
    localStorage.setItem('user',JSON.stringify(resp.data));
    setOpenDialog(false);
    onGgenerateTrip()
  })
}

const saveAiTrip = async (TripData) => {

    setLoadings(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
 const tripObject = typeof TripData === "string" ? JSON.parse(TripData) : TripData;
    await setDoc(doc(db, "AITrip", docId), {  
      userSelection: formData,
      tripData: tripObject,
      userEmail: user?.email,
      id: docId,
    });
    setLoadings(false);
    navigate('/view-trip/'+docId)
  
};



  // Fetch suggestions instantly
  const fetchSuggestions = async (q) => {
    if (!q || q.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        q
      )}&key=${apiKey}&limit=5`;
      const res = await axios.get(url);
      console.log(res.data);

      setSuggestions(res.data.results);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

 const handleSelect = (place) => {
  const placeData = {
    label: place.formatted,
    value: {
      description: place.formatted,
      place_id: place.annotations?.geohash || null,
    },
  };

  setQuery(place.formatted);
  setSuggestions([]);
  setSelected(true);
  handleInputChange("location", placeData); // only here we set location
};


  const handleFocusOrClick = () => {
    if (selected) return; // prevent suggestions after selection
    if (query.length > 0) {
      fetchSuggestions(query);
    }
  };

  useEffect(() => {
  if (!query) return;
  clearTimeout(debounceRef.current); // stop old timer
  debounceRef.current = setTimeout(() => {
    fetchSuggestions(query); // call API after 500ms of no typing
  }, 500);

  return () => clearTimeout(debounceRef.current); // cleanup
}, [query]);
  return (
    <div className="sm:px-10 md:px-30 lg:px-56 xl:px-62 px-5 mt-3 sm:m-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-10">
        <h1 className="text-xl font-bold">What is destination of choice ?</h1>
        <div
          style={{
            maxWidth: 800,
            margin: "0.7rem auto",
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          <input
            type="text"
            value={query}
            placeholder="Search for a place..."
onChange={(e) => {
  const value = e.target.value;
  setQuery(value);
  setSelected(false);

}}
            onFocus={handleFocusOrClick}
            onClick={handleFocusOrClick}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />

          {loading && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 10,
                fontSize: "14px",
                color: "#777",
              }}
            >
              Loading...
            </div>
          )}

          {!selected && suggestions.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                marginTop: 6,
                border: "1px solid #ddd",
                borderRadius: 6,
                maxHeight: 200,
                overflowY: "auto",
                position: "absolute",
                width: "100%",
                background: "#fff",
                zIndex: 1000,
              }}
            >
              {suggestions.map((place, i) => (
                <li
                  key={i}
                  onClick={() => handleSelect(place)}
                  style={{
                    padding: "8px 10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {place.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold mb-3 mt-10">
            How many days are you planning your trip ?
          </h1>
          <Input placeholder={"Ex-3"} 
          onChange={(v)=>handleInputChange('noOfDays',v.target.value)} />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold mb-3 mt-10">What is Your Budget ?</h1>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, i) => (
            <div
              key={i}
             onClick={()=>handleInputChange('budget',item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
              ${formData?.budget===item.title&&' border-black shadow-lg'}
              `}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500 text-justify">{item.desc}</h2>
            </div>
          ))}
        </div>

      </div>

      <div>
        <h1 className="text-xl font-bold mt-10 mb-3">Who do you plan on traveling with on your next adventure ?</h1>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, i) => (
            <div
              key={i}
               onClick={()=>handleInputChange('traveler',item.people)} 
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
              ${formData?.traveler===item.people&&' border-black shadow-lg'}
              ` }>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500 text-justify">{item.desc}</h2>
            </div>
          ))}
        </div>

      </div>

      <div className="my-10 flex justify-end">
        <Button 
        disabled={loadings}
        onClick={onGgenerateTrip }>
          {loadings?
          <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin "/>:'Generate Trip'}
          </Button>
      </div>

          <Dialog open={openDialog}  onOpenChange={setOpenDialog}>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription>
        
        <img src="/logo.svg" alt="" />
        
      </DialogDescription>
      <h2 className="font-bold text-lg mt-7">Sign in Google</h2>
        <p className="mt-2">Sign in to the App with Google authenticaction securely.</p>

        <Button 
      
        onClick={login}
        className="w-full mt-5 " >
          
          <FcGoogle className='h-6 w-6'/>
          Sign in With Google
       
          </Button>
          
    </DialogHeader>
  </DialogContent>
</Dialog>



    </div>


  );
};

export default createTrip;
