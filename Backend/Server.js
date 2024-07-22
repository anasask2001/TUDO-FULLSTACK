import express from "express"
import dotenv from "dotenv"
import cors from"cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import TudoRoute from "./ROUTES/TudoRoutes.js"


//dotenv config
dotenv.config()
const Server = express()
//conncting cores

Server.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))


//globaly used bodyprser and cookie parser
Server.use(express.json())
Server.use(cookieParser())


Server.use("/api/tudolist",TudoRoute)




//connection of mongodb and port
mongoose.connect(process.env.db)
.then(()=>console.log("DB CONNECTED"))
.catch((error)=>console.log(error))
//loCAL HOST 
const PORT = process.env.PORT || 3004
Server.listen(PORT,()=>{
    console.log(`server running ${PORT}`);
});