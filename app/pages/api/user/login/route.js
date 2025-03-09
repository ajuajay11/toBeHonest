import { NextResponse, NextRequest } from "next/server";
import User from "@/models/users";
import connectToDatabase from '@/lib/db';
import jwt from "jsonwebtoken"
 export async function POST(req ){
    try {
        await connectToDatabase();
        const {email,password} = await req.json();
        console.log(email,password);
        if(!email || !password){
            return NextResponse.json({message:"please enter your email"},{status:404})
        }
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        const token = jwt.sign(
            {
              email: user.email,
              userId: user._id.toString(),

            },
            process.env.JWT_SECRET,
            {expiresIn:'12d'}
        )
        console.log(token,'tokentoken');
        return NextResponse.json({message:"login successfully", user:{
            id:user._id,
            firstname :user.email,
            lastname:user.lastname,
            email:user.email,
            gender:user.gender,
            age:user.age,
            role:user.role,
            wallet:user.wallet,
            token
        }},{status:200})
    } catch (error) {
        return NextResponse.json({message:"login error please try again"},{status:500})
        
    }
}