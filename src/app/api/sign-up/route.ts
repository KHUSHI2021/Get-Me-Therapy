import dbConnect from "@/lib/dbConnect";  //almost bin all route.ts becouse next.js working in edge
import UserModel from "@/app/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationCode";
//import VerificationEmail from '../../../../emails/VerificationEmail';

// api call krwa rahe hai hum

export async function POST(request:Request){
    await dbConnect()

    try{

        const {username,email,password}=await request.json();

        const existingUserVerifiedByUsername=await UserModel.findOne({
            username,
            isVerified:true
        });
        if (existingUserVerifiedByUsername) {
                return Response.json({
                    succes:false,
                    message:"username is already taken",
                },
            {status:400});
        }
        const existingUserByEmail=await UserModel.findOne({email})
        const verifyCode=Math.floor(100000+Math.random()* 900000).toString()
        if(existingUserByEmail){
            if (existingUserByEmail.isVerified){

                 return Response.json({
                   succes:false,
                    message:"User already exist with this email"

            }, {status:500});

            }
            else{
                const hasedPassword = await bcrypt.hash
                (password,10);
                existingUserByEmail.password=hasedPassword;
                existingUserByEmail.verifyCode=verifyCode;
                existingUserByEmail.verifyCodeExpiry=new
                Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }
        }

        else{
        const hashedPassword= await bcrypt.hash(password,10)
        const expiryDate=new Date()                  //now doubt here that we set expirydate as const then how we change just bellow the reason is that date is object object kai age kuch bhi ho let const memory kai ander refernce point uske ander jo value hai vo chnge ho sakti
        expiryDate.setHours(expiryDate.getHours()+1)

       const newUser= new UserModel({
            username,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified:false,
            isAcceptingMessage:true,
            messages:[]
            

        });

        await newUser.save()
        }

        //send verification email
        const emailResponse =await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if(!emailResponse.success){
            return Response.json({
                   succes:false,
                    message:emailResponse.message,

            }, {status:500})
        }
        return Response.json({
            succes:true,
             message:"user registered successfully.Please verify your email"

     }, {status:201});

    }
    catch(error){
        console.error('Error registering user',error);
        return Response.json(
            {
            success:false,
            message:"error registering user",
            },
        {
            status:400
        });
    }
}