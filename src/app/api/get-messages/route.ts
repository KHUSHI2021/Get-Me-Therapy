import { getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/User";
import {User} from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user= session?.user

    if (!session || !session.user){
        return Response.json(
            {
                success: false,
                message:"Error varifying user"
            },
            {status:500}
        )
    }

  
const userId = new mongoose.Types.ObjectId(user._id);
try {
    const user = await UserModel.aggregate([
        { $match : {id: userId}},  // by this we want one user that id match 
        {$unwind: '$message'},
        {$sort:{'messages.createdAt': -1}},
        {$group:{_id: '$_id',messages:{$push:'$messages'}}}
    ])

    if(!user|| user.length===0){
        return Response.json(
            {
                success: false,
                message:"user not found"
            },
            {status:502}
        )
    }
    
} catch (error) {
    console.log("An unexpected error occured:",error)
    return Response.json(
        {
            success: false,
            messages:"Not Authentication"
        },
        {status :500}
    ) 
}
}
