import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users";  // Import User model
import { verifyToken } from "@/utils/auth"; // Your token verification utility

export async function GET(req){
   try {
    await connectToDatabase();
     const authHeader = req.headers.get("authorization");
     console.log(authHeader);
     let token;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7);  
      } else {
        return NextResponse.json({ message: "No token found" }, { status: 401 });
      }
    const userData = await verifyToken(token);
    console.log(userData,'userData');
    const user = await User.findById(userData.userId);
    
    return NextResponse.json({message: 'Hello from Next.js API!',user});
   } catch (error) {
    return NextResponse.json({message:"404 error"},{status:404})
   }
}