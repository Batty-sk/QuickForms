const Express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=Express()
const dotenv = require('dotenv');
const formRouter=require('./Routers/formsRouter')
const authRouter=require('./Routers/authRouter.js')

dotenv.config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.wa3ihmp.mongodb.net/FormsClone?retryWrites=true&w=majority`,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,}).then(()=>{console.log('Database Connection Establish Successfully!')}).catch(error=>{
        console.log('error has been occured!',error)
    })

app.use(Express.json())
app.use(cors())
app.use('/auth',authRouter)
app.use('/forms',formRouter)

app.listen(8000, ()=>{
    console.log("The server has been started!")
})
