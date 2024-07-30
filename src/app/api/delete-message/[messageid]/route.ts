import { getServerSession} from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/User";
//import {User} from "next-auth";
import mongoose from "mongoose";
import { string } from 'zod';

export async function DELETE(request: Request, {params}: {params: {messageid:string}}){
   const messageId = params.messageid
   
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user= session?.user

    if (!session || !session.user){
        return Response.json(
            {
                success: false,
                message:"Error varifying user"
            },
            {status:401}
        )
    }

    try {

       const updateResult =  await UserModel.updateMany(
            {_id: user._id},
            {$pull: {messages:{_id: messageId}}}
        )

        if(updateResult.modifiedCount==0){
            return Response.json({

                  success: false,
                  message:"Message not found pr already delete"
            }
        ,{
            status:401
        }
    )
}

return Response.json({

    success: true,
    message:"Message  deleted"
}
,{
status:200
}
)
        
    } catch (error) {

        return Response.json({

            success: false,
            message:"error deleting message"
      }
  ,{
      status:500
  }
)
        
    }

 
}
