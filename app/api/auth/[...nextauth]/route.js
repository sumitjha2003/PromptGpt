import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from "@utils/database.js";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks : {
    async session({session}) {
        const sessionUser = await User.findOne({
            email:session.user.email
        })
        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({profile}) {

        try {
            await connectToDB();

            const userExist = await User.findOne({
                email: profile.email
            });
            // if(!userExist) {
            //     await User.create({
            //         email : profile.email,
            //         username : (profile.username || '').replace(" ","").toLowerCase(),
            //         image : profile.picture
            //     })
            // }
            if (!userExist) {
                let username = profile.username || profile.email.split('@')[0]; // Use email address as username if profile.username is not available
                username = username.replace(/\s/g, "").toLowerCase(); // Remove spaces and convert to lowercase
                await User.create({
                    email: profile.email,
                    username: username,
                    image: profile.picture
                })
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

        
    }
}
    
})

export {handler as GET, handler as POST};