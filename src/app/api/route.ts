import dbConnect from "@/lib/dbConnect";
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
    