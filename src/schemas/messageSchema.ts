import {z} from "zod"

export const messageSchema= z.object({
content:z
.string()
.min(10,{message:'content must be at least of 3 characters'})
.max(300,{message:'content must be no longer than of 300 characters'}),


    
})