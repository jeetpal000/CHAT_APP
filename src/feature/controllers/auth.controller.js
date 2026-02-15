"use server"
import { CreateServer } from "@/lib/db"
import { UserTable } from "../model/Schema";


export const getUserData = async(session)=>{
    await CreateServer();
    const result = await UserTable.findOne({email: session?.user?.email});
    return {
        name: result.name,
        email: result.email,
        number: result.number,
        isProfileCompleted: result.isProfileCompleted,
        avatar: result.avatar
    };
}