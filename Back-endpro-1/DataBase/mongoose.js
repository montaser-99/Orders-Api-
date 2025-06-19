import  dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()
const Url=process.env.DB_URL


export function Dbconnection(){
    mongoose.connect(Url).then(()=>console.log("Connect To DateBase"))
    .catch(() => {
        console.log(`Can't Connect To DateBase`);})

}