import { connectDB } from "@/config/dbConfig";
import EventModel from "@/models/eventmodel";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import { getMongoUserLoggedInUser } from "@/actions/users";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const {userId} = auth();
        if(!userId) return NextResponse.json({message: 'Unauthorize request'}, {status: 401});

        const mongoUserId = await getMongoUserLoggedInUser();
        const requestBody = await request.json();
        console.dir(requestBody, {depth: null});
        requestBody.user = mongoUserId;
        await EventModel.create(requestBody);
        return NextResponse.json({message: 'Event created successfully'}, {status: 201});
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}
