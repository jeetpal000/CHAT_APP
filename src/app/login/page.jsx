"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const router = useRouter();
      const { data: session, status } = useSession();
      useEffect(()=>{
        if(status === "authenticated"){
          if(session?.user?.isProfileCompleted){
            redirect("/")
          }else{
            redirect("/profile")
          }
        }
      },[status,session, router])
      // if(session){
      //   router.push("/profile")
      // }
  return (
    <main className="relative">
      <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="bg-[#ddddddd0] w-80 h-50 p-2 rounded-md backdrop-blur-2xl">
          <h1 className="text-center font-bold text-xl">Login with Google</h1>
          <div className="flex items-center justify-center">
            <Button
              onClick={() => {
                signIn("google");
              }}
              className="mt-2 active:scale-90 bg-pink-700"
            >
              <FaGoogle /> Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
