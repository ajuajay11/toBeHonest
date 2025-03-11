import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DarkTruth from "@/models/UserVibes";
import User from "@/models/users";
import { verifyToken } from "@/utils/auth";

export async function GET(req) {
    try {
        const authHeader = req.headers.get("authorization");
        let token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

        await connectToDatabase();
        const darkTruths = await DarkTruth.find({});

        const userIds = darkTruths.map((item) => item.user);
        const userDetails = await User.find({ _id: { $in: userIds } });

        const userDetailsMap = {};
        userDetails.forEach((item) => {
            userDetailsMap[item._id] = {
                email: item.email,
                gender: item.gender,
            };
        });

        let responseData = darkTruths.map((darkTruth) => {
            const userDetailsForDarkTruth = userDetailsMap[darkTruth.user] || null;
            if (!darkTruth.emailAllowed && userDetailsForDarkTruth) {
                delete userDetailsForDarkTruth.email;
            }
            return {
                ...darkTruth._doc,
                userDetails: userDetailsForDarkTruth,
            };
        });

        // If no token, limit the response to 10 items
        if (!token) {
            responseData = responseData.slice(0, 10);
        }

        return NextResponse.json({ message: "Success", darkTruths: responseData}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
