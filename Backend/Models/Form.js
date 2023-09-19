const mongoose=require('mongoose')

const Form= new mongoose.Schema({
    formData:{
        type:Array,
        }
})

const form= mongoose.model('Form',Form)

module.exports=form