"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/feature/validation/validation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { registerUser } from "./login.Action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
//  registerUser(session)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async(data) => {
    const result = await registerUser(session, data);

    toast.success(result.message);
    if(result){
      router.push("/")
    }

  };

  return (
    <>
      {/* {session && (
        <div>
          {" "}
          <h2>Welcome {session.user.name}</h2>
          {" "}
          <p>Email: {session.user.email}</p>
          {" "}
          <Image src={session.user.image} alt="Profile" width={100} height={100} loading="eager" />
          {" "}
          <button onClick={() => signOut()}>Sign out</button>
          {" "}
        </div>
      )} */}
      <main className="max-w-120 mx-auto min-h-screen flex items-center justify-center p-1">
        <div className="bg-linear-60 from-[#ea86fb66] via-[#b7b7ff63] to-[#9ae39a6f] w-full  shadow-[0px_0px_10px_#1fc] rounded-md p-2 flex flex-col backdrop-blur-3xl">
          <h2 className="text-center font-bold text-xl">Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="">
              <Field>
                <FieldLabel
                  htmlFor="input-field-username"
                  className="mt-2 -mb-2 text-white"
                >
                  Name*
                </FieldLabel>
                <Input
                  id="input-field-username"
                  type="text"
                  required
                  placeholder="Enter your username"
                  {...register("name", { required: "Username is required" })}
                />
              </Field>
              {errors.name &&(<p className="text-sm text-destructive">{errors.name.message}</p>)}
              <Field>
                <FieldLabel
                  htmlFor="input-field-username"
                  className="mt-2 -mb-2 text-white"
                >
                  Mobile Number*
                </FieldLabel>
                <Input
                  id="input-field-username"
                  type="number"
                  inputMode="numeric"
                  required
                  placeholder="Enter your Number"
                  {...register("number", { required: "Username is required" })}
                />
              </Field>
              {errors.name &&(<p className="text-sm text-destructive">{errors.number.message}</p>)}
              <Field>
                <FieldLabel
                  htmlFor="input-field-username"
                  className="mt-2 -mb-2 text-white"
                >
                  About*
                </FieldLabel>
                <Input
                  id="input-field-username"
                  type="text"
                  placeholder="Enter your username"
                  {...register("about", { required: "Username is required" })}
                />
              </Field>
              {errors.name &&(<p className="text-sm text-destructive">{errors.about.message}</p>)}


             
            </div>
            <div className="flex items-center justify-center">
              <Button className="cursor-pointer active:scale-90 bg-[#02bbffcf]">Save</Button>
            </div>
          </form>
           
        {/* <Button onClick={() => {signIn("google"); onSubmit}}
        className="mt-2 active:scale-90 bg-pink-700"
          ><FaGoogle /> Sign in with Google</Button> */}
        </div>
      </main>
    </>
  );
};

export default Profile;
