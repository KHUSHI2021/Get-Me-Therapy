import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number //isConnected check then only move ahead we also can collect data in form of string 
}
const connection : ConnectionObject={}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database"); //just optimization check
        return;
    }
 try{
    const db = await mongoose.connect(process.env.MONGODB_URI || '',{})
    connection.isConnected=db.connections[0].readyState 
    console.log("DB Connected Successfully");
}
 catch(error){
    console.log("Database connection failed",error);
    process.exit(1)
 }

}

export default dbConnect;