const mongoose=require("mongoose");


mongoose.connect("mongodb://localhost:27017/students",{
    useNewUrlParser:true,
}).then(()=>{
    console.log("Connection is successful")
}).catch((e)=>{
    console.log("connection lost");
})

mongoose.set('strictQuery', true);