"use server";
import { UserTable } from "@/feature/model/Schema";
import { CreateServer } from "@/lib/db";

export const registerUser = async (session, data) => {
  await CreateServer();
  const user = await UserTable.findOne({ email: session.user.email });

  if(user){
    const result = await UserTable.findOneAndUpdate({email: session.user.email},
        {
            name: data.name && data.name.trim() !== ""? data.name :  session.user.name ,
            number: data.number,
            about: data.about,
            avatar: data.avatar&& data.avatar.trim() !== "" ? data.avatar : session.user.image,
            isProfileCompleted: true,
        },
        {new: true, upsert: true}
    );

    return {message: "Profile details saved",}
  }

  if (!user) {
    const result = await UserTable.create({
      name: data.name && data.name.trim() !== ""? data.name :  session.user.name ,
      email: session.user.email,
      avatar: data.avatar&& data.avatar.trim() !== "" ? data.avatar : session.user.image,
      about: data.about,
      number: data.number,
      isProfileCompleted: true,
    });

    return {
      message: "Profile saved",
    }
  }
};

export const userDetails = async(session)=>{
  console.log(session)
  // return await UserTable.findOne({email: session.user.email})
}
