import UserModel from "@/app/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/app/model/User";
//import messages from '@/messages.json';
import { twMerge } from 'tailwind-merge';

export async function POST(request: Request){
    await dbConnect()
    const {username,content}=await request.json()
    try {
       const user= await UserModel.findOne({username}).exec();
        if (!user) {

            return Response.json(
                {
                    success:false,
                    message:"User not found"

                },
                {status:404}
            )
            
        }
       if (!user.isAcceptingMessage){
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



/*import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendVerificationCode";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request:Request){
    await dbConnect()

    try{
        const{username,email,password}= await request.json()
    }
    catch (error){
        console.error('Error registering user',error)
        return Response.json(
            {
                success:false,
                message:"error registering user"
            },
            {
                status:500
            }
        )
    }
}
   */