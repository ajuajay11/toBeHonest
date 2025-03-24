import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DarkTruth from "@/models/UserVibes";
import User from "@/models/users";
import { verifyToken } from "@/utils/auth"; // Your token verification utility

export async function POST(req,{ params }) {
    const {id} = await params;
      const { text, userId } = await req.json();

    try {
        await connectToDatabase();
        const userOfComments = await User.findById(userId);
        console.log(userOfComments,'user');
        const userData = {
            _id: userOfComments._id,
            email: userOfComments.email,
            firstname: userOfComments.firstname,
            lastname: userOfComments.lastname,
            profilePicture: userOfComments.profilePicture
        };
        
        let token;
        const authHeader = req.headers.get("authorization");
             console.log(authHeader, "authHeader");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          token = authHeader.slice(7); // Remove 'Bearer ' prefix (7 characters)
        } else {
          return NextResponse.json({ message: "No token found" }, { status: 401 });
        }
        const verToken = await verifyToken(token);
            if (!verToken) {
              return NextResponse.json({ message: "invalid token" }, { status: 401 });
            }
        if (!userOfComments) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const darkt = await DarkTruth.findById(id);
        if (!darkt) {
            return NextResponse.json({ message: "DarkTruth not found" }, { status: 404 });
        }
        darkt.comments.push({
          userId: userData, // Correct// Store the user's ID
            text: text, // Store the comment text
            createdAt: new Date(), // Add a timestamp
          });
      
          // Save the updated DarkTruth document
          await darkt.save();
      
          return NextResponse.json({ message: "Comment added successfully", darkt }, { status: 200 });
    } catch (error) {
        return NextResponse.json({message:"server error"},{status:500});        
    }
}