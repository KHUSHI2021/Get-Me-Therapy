import {z} from 'zod';

export const usernameValidation=z
.string()
.min(3,"Username must be contain atleast 3 characters")
.max(20,"Username must be not more than 20 characters")
//regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "User not be contain special character")
.regex(/^[a-zA-Z0-9_]+$/,"Username must not be contain special characters");

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:'Invalid email address'}),
    password:z.string()
              .min(4,{message:"password must be at least 4 characters"})
              .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
               .regex(/[a-z]/, { message: "Password must include at least one lowercase letter" })
               .regex(/[!@#$%^&*]/, { message: "Password must include at least one special character" })
               
              

});