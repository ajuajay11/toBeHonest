import { NextResponse, NextRequest } from "next/server";
import User from "@/models/users";
import connectToDatabase from '@/lib/db';

 export async function POST(req){
    
    try {
        await connectToDatabase();
        
        const {email, password, firstname, lastname, gender, age, profilePicture} = await req.json();        
         if(!email || !password || !firstname || !lastname || !gender || !age){
            return NextResponse.json({message:"please enter your email"}, {status:404})
        }
        const user = await User.findOne({email});        
        if(user){
            return NextResponse.json({message:"email already exist"},{status:404})
        }
        const newUser = new User({email,password,firstname,lastname,gender,profilePicture});
        console.log(newUser,'newUser====');
        
        await newUser.save();
        return NextResponse.json({message:"registration success",newUser},{status:200})
    } catch (error) {
        console.log(error,'error=');
        return NextResponse.json({message:"login error please try again"},{status:500})
    }
}