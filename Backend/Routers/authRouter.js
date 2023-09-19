const Express=require('express')
const FormUserModel=require('../Models/Users')
const authRouter=Express.Router()





authRouter.post('/createuser',async (req,res)=>{
    const userData=req.body
    console.log('email of the user',userData);
    try{
    const User= new FormUserModel({
        userId:userData.uid,
        email:userData.email,
    })
   const user=await User.save();
 return res.send({'message':'User created successfully!'})

}
    catch(error)
    {
        console.log('error while creating the user',error)
    }
    res.status(400)
})

module.exports=authRouter