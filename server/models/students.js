const mongoose=require("mongoose");
const validator=require("validator");

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        minlength:3,
    },
    email:{
      type:String,
      require:true,
      unique:[true, "Email is already registered"],
      validate(value){
        if(!validator.isEmail(value)){
            throw new error("Invalid Email")
        }
      }
    },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true,
    }
})

const Student = new mongoose.model('Student', studentSchema)
module.exports = Student;
