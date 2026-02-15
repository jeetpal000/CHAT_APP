import { UserTable } from "@/feature/model/Schema";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async session({session}){
  //     const dbUser = await UserTable.findOne({email: session.user.email});
  //     if(dbUser){
  //       session.user.isProfileCompleted = dbUser.isProfileCompleted;
  //     }
  //     return session;
    // },
  // },
};

export default NextAuth(authOptions);
