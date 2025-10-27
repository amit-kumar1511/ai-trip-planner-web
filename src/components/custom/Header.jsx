import React, { useEffect,useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../custom/dialog";
import { FcGoogle } from "react-icons/fc";

const Header = () => {
  
  const user = JSON.parse(localStorage.getItem("user"));
   const [openDialog , setOpenDialog] =useState(false);
  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
  onSuccess:(codeResp)=>GetUserProfile(codeResp),
  onError:(error)=>console.log(error)
  })

  
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
    window.location.reload()
  })
}

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
      <img src="/logo.svg" className="cursor-pointer" alt="" />
</a>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-5">
            <a href="/create-trip">
            <Button   className="rounded-full cursor-pointer px-2  sm:px-6 lg:px-3 py-2 sm:py-3 lg:py-4" variant="outline">
              + Create Trip
            </Button>
            </a>
            <a href="/my-trip">
            <Button className="rounded-full cursor-pointer px-2 sm:px-6 lg:px-3 py-2 sm:py-3 lg:py-4" variant="outline">
              My Trips
            </Button>
</a> 
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt={user.given_name}
                  className="h-[35px] w-[35px] rounded-full cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button className='cursor-pointer' onClick={()=>setOpenDialog(true)}>
            Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}  onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
            </DialogDescription>
            <h2 className="font-bold text-lg mt-7">Sign in Google</h2>
            <p className="mt-2">
              Sign in to the App with Google authenticaction securely.
            </p>
            <Button onClick={login} className="w-full mt-5 ">
              <FcGoogle className="h-6 w-6" />
              Sign in With Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Header;
