import UserModel from "@/app/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/app/model/User";
//import messages from '@/messages.json';

export async function POST(request: Request){
    await dbConnect()
    const {username,content}=await request.json()
    try {
       const user= UserModel.findOne({username}).exec();
        if (!user) {

            return Response.json(
                {
                    success:false,
                    message:"User not found"

                },
                {status:404}
            )
            
        }
       if (!user.isAcceptingMessages){
        return Response.json(
            {
              success:false,
              message:"User is not accepting the messages"

            },
            {status : 403}
        )

       }
        const newMessage ={ content,createdAt:new Date()}
        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json(
            {
                success: false,
                messages:"message sent succesfully "
            },
            {status :401}
        ) 

    } catch (error) {

        console.log("Error adding messages",error)
        return Response.json(
            {
                success: false,
                messages:"Internal server error"
            },
            {status :500}
        ) 
        
    }

}

