"use client";
import Header from "@/components/Header";
import { getUserData } from "@/feature/controllers/auth.controller";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // if (status === "unauthenticated") {
    //   router.push("/login");
    //   return;
    // }

    if (status === "authenticated" && session) {
      const fetchUserData = async () => {
        const result = await getUserData(session);
        // console.log("result", result);
        setUserData(result);
      }
      fetchUserData();
    }
  }, [session, status, router]);

  // Show loading state
  if (status === "loading" || !userData) {
    return <div className="font-bold text-center text-3xl">Loading...</div>;
  }

  // console.log("userData", userData);

  return <Header userData={userData} />;
};

export default Page;
