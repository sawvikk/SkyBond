import mongoose from "mongoose";

export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName: "SkyBondDB"
        });
        console.log("first connected to MongoDB")
    }
    catch(err){
        console.log(err);
    }
}