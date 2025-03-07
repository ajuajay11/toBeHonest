import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/users"; // Import User model
import DarkTruth from "@/models/UserVibes"; // Import User model
import { verifyToken } from "@/utils/auth"; // Your token verification utility

export async function POST(req) {
  try {
    await connectToDatabase();
    const { yourStoryTitle, chroniclesOfYou, replyAllowed, emailAllowed } =
      await req.json();
    if (
      !yourStoryTitle ||
      !chroniclesOfYou ||
      replyAllowed === undefined ||
      emailAllowed === undefined
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }
    // For Next.js App Router or Edge Runtime
    const authHeader = req.headers.get("authorization");

    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7); // Remove 'Bearer ' prefix (7 characters)
    } else {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }
    const userData = await verifyToken(token);
    const user = await User.findById(userData.userId);
    console.log(user,'user================================');
    
    const useDetails = {
      email: user.email,
      age: user.age,
      gender: user.gender,
    };
    console.log(useDetails, "useDetailsuseDetailsuseDetails");

    const newdarktruth = new DarkTruth({
      yourStoryTitle,
      chroniclesOfYou,
      replyAllowed,
      emailAllowed,
      user:user._id,
    });
    await newdarktruth.save();
     return NextResponse.json({
      message: "Yo, that was fire! You crushed it 💯",
      newdarktruth,
      email: useDetails.email,
      age: useDetails.age,
      gender: useDetails.gender,
    });
  } catch (error) {
    console.log(error,'error');
    
    return NextResponse.json({ message: "server error." }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const authHeader = req.headers.get("authorization");
    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7); // Remove 'Bearer ' prefix (7 characters)
    } else {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }
    const userData = await verifyToken(token);
     const user = await User.findById(userData.userId);
     const data = await User.findOne({ _id: userData.userId });
 
    return NextResponse.json(
      {
        message: "your are Awsome",
        data,
        email: userData.email,
        firstname: user.firstname,
        userData:userData.userId
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Come on do it again" },
      { status: 500 }
    );
  }
}