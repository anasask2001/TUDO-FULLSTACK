import mongoose from "mongoose";



const tudoschema  = new  mongoose.Schema({
   
    Title:{
        type:String,
        required:true
    },
    Description:{
      type:String,
      required:true
    },
    Time :{
        type:String,
        required:true,
        default:new Date().toTimeString()
    },
    Date:{
        type:Date,
        required:true,
        default:Date.now
    }
})


const TudoSchema = mongoose.model("TudoSchema",tudoschema)
export default TudoSchema