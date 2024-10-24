const mongoose=require('mongoose')
const FormSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type: String
    },
    age:{
        type: String
    }


})
const Formmodel=mongoose.model('Form',FormSchema)
module.exports=Formmodel