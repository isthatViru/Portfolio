const mongoose=require('mongoose')
 const connection=async()=>{
     await mongoose.connect(process.env.MONGO_STRING)
 }

 module.exports=connection