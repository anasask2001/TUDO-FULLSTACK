import TudoSchema from "../MODEL/TudoSchema.js";

// Add data
export const addtudo = async (req, res, next) => {
  try {
    const { Title, Description } = req.body;


    if (Title && Description) {
      const createdata = new TudoSchema({
        Title: Title,
        Description: Description
      });
      await createdata.save();
      return res.status(200).json({ message: "tudo data created" });
    } else {
      return res.status(400).json({ message: "Title and Description are required" });
    }
  } catch (error) {
    console.log(error)
  }
};


//update data 

export const updatedata = async(req,res,next)=>{
    try {
       const dataid = req.params.dataid
       const update = await TudoSchema.findById(dataid)
       if(!update){
        return res.status(404).json({message:"not found data"})
       }

       const { Title, Description}=req.body
       if( Title && Description){
          update.Title = Title,
          update.Description=Description
       }else{
        return res.status(404).json({message:"Title and Description required "})
       }

       await update.save()
       res.status(200).json({message:"data is upadated sucessfully ",update})
    } catch (error) {
        console.log(error)
    }
}

//delete data 
export const deletedata = async(req,res,next)=>{
    try {
       const  dataid = req.params.dataid
       const dletedate = await TudoSchema.findOneAndDelete({_id:dataid})
       if(dletedate){
        return res.status(200).json({message:"deleted sucessfully"})
       }else{
        return res.status(404).json({message:"data not found"})
       }
    } catch (error) {
        console.log(error)
    }
}


export const showalldatas = async(req,res,next)=>{
    try {
       const alldatas = await TudoSchema.find()
       if(alldatas.length === 0){
        return res.status(404).json({message : "no collections "})
       }else{
        return res.status(200).json(alldatas)
       }
    } catch (error) {
        console.log(error);
    }
}

export const showdatabyid = async(req,res,next)=>{
  try {
    const dataid =  req.params.dataid
    const findiddata = await TudoSchema.findById(dataid)
    if(!findiddata){
      return res.status(404).json({message:"no datas in this id"})
    }else{
      return res.status(200).json(findiddata)
    }
  } catch (error) {
    
  }
}