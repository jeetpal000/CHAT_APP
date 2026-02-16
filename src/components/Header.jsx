"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Field, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'
import Chat from './WebScokets'

const Header = (userData) => {
  // console.log(userData.userData.avatar)
  const {register, handleSubmit, watch, formState: {errors}} = useForm();
  return (
    <section className="relative max-w-120 mx-auto h-screen bg-[#f2efef] flex flex-col">
      <header className="absolute left-0 w-full mx-auto z-10 bg-linear-120 from-[#4c4cf7] via-[#ca8eff] to-[#8383ff] py-5 flex items-center justify-between px-2 shadow-[0_10px_20px_rgba(1,1,255,0.89)] rounded-b-[50px] top-0">
        <Button className="absolute top-0 left-0">Back</Button>
        <div className="">
          <h1 className="font-bold ">{userData.userData?.name}</h1>
        </div>
        <div className="">
          <Image src={userData.userData?.avatar} alt="Profile" width={80} height={80} loading="eager" className='rounded-full' />
        </div>
      </header>
      <main className='flex-1 px-2 py-40 overflow-y-auto h-full text-black font-medium'>
       
        <Chat email={userData.userData?.email}  />
      </main>
     

      {/* <footer className='absolute bottom-2 bg-[#cecece] left-0 w-full h-10 rounded-2xl overflow-hidden flex items-center justify-between'>
      <form className="flex items-center justify-between w-full ">
        <input type="text"
        placeholder='Type a message.......'
        className='w-100 h-100 px-4  text-black text-xl border-0 outline-0'
        {...register("message", )}
        />
        <Button className="bg-transparent text-black hover:bg-gray-400 rounded-full"><Send /></Button>
      </form>
      </footer> */}
      </section>
  )
}

export default Header