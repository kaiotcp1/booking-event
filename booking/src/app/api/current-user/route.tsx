import { connectDB } from "@/app/config/dbConfig";
import UserModel from "@/app/models/usermodel";
import { auth } from "@clerk/nextjs";
import { connect } from "http2";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(request: NextRequest) {
    try {
        const {userId} = auth();
        if(!userId) throw new Error('unauthorized request');

        const userInMongoDb = await UserModel.findOne({clerkUserId: userId});
        console.log('UserInMongoDb Log: ' + userInMongoDb);
        return NextResponse.json({user: userInMongoDb}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500});
    };
};