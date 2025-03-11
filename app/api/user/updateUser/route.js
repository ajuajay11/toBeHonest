import connectToDatabase from "@/lib/db";
import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth"; // Your token verification utility

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { email, firstname, lastname, gender, age } = await req.json();
    console.log(
      email,
      firstname,
      lastname,
      gender,
      age,
      "email, password, firstname, lastname, gender, age"
    );

    const authHeader = req.headers.get("authorization");
    console.log(authHeader, "authHeader");

    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7); // Remove 'Bearer ' prefix (7 characters)
    } else {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }
    const userData = await verifyToken(token);
    if (!userData) {
      return NextResponse.json({ message: "invalid token" }, { status: 401 });
    }
    const user = await User.findById(userData.userId);
    console.log(
      user,
      "userDatauserDatauserDatauserDatauserDatauserData==-=-==-=-==-===-=-=-"
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 }); // Not found status
    }
    const updateUser = {
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      age: age,
      email: email,
    };

    // This is also fine - updatedUser will be the newly updated document
    const updatedUser = await User.findByIdAndUpdate(
      userData.userId,
      { $set: updateUser },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { message: "user updated", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
