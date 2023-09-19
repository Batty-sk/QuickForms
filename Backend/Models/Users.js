const mongoose=require('mongoose')

const User= new mongoose.Schema({
    userId:
    {type:String,
    required:true
    },
    forms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    }],
    response:{
        type:Array,
        default:[]
    }
    ,
    email:{
        type:String,
    }

})

const FormUserModel = mongoose.model('User',User)

module.exports=FormUserModel