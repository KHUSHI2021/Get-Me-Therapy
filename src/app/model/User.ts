import mongoose,{Schema,Document} from "mongoose";
import messages from '@/messages.json';


export interface Message extends Document{  // an interface need to be given a name 
       
     _id:string;    
     messages: string;                                   // and this data will goes to Document by using extends(sytax) for mongoose
    content:string;
    createdAt:Date
    type:string;
}

const MessageSchema: Schema<Message> = new Schema({
  content:{
    type:String,   //in mongoose neet to write string in " 1"Capital later 
    required :true
  },
  createdAt:{
    type: Date,
    required: true,
    default: Date.now
  }
 
})

export interface User extends Document{  
username:string;
email:string;
password: string;
verifyCode: string;
verifyCodeExpiry: Date;
isVerified:Boolean;
isAcceptingMessage:Boolean;
messages:Message[];
}


const UserSchema: Schema<User> =new Schema({
    username:{
      type:String,    
      required :[ true,"Enter a username to continue "],
      trim:true,
      unique:true
    },
    email:{
        type:String,   
        required :[ true,"Email is needed to proceed "],
        unique:true,
        match:[ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Kindly enter a correct email address"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"password is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"password is required"],
    },
    isVerified:{
        type:Boolean,
       default: false,
    },
    isAcceptingMessage:{
        type:Boolean,
       default: true,
    },
    messages:[MessageSchema]

  })
  
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel;