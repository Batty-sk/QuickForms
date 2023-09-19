const Express=require('express')
const FormUserModel=require('../Models/Users')
const form=require('../Models/Form')
const Frouter=Express.Router()
const admin = require('firebase-admin');

const serviceAccount = require('../quick-forms-e4a91-firebase-adminsdk-tzdp2-05ecd225fe.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // ...
});
Frouter.use(async(req,res,next)=>{

    // validation logic
    const idToken = req.headers.authorization;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken.split(' ')[1]);
        const uid = decodedToken.uid; // User's UID
      
        // Proceed with retrieving user data from your database using the UID
        const user = await FormUserModel.findOne({ userId: uid });
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
      
        // Update the user's forms array with the new form ID
        req.user=user
        next()

      } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token' });
      }


})

const validateform=async (req,res,next)=>{
    console.log('validating the form')
    try{
    const Form = await form.findById(req.query['id']);
    req.form=req.query['id']
    const ResponseForm=req.body.data
    console.log('form data vs response form data',Form.formData,ResponseForm)
    for(i=0;i<Form.formData[0].data.length;i++)
    {
        if(Form.formData[0].data[i].Required && ResponseForm[i].Question==undefined) // chking if the user has leave the component blank if required.
        {
            console.log('entering here')
             if(Form.formData[0].data[i].Date)
            {
                if(!ResponseForm[i].Date)
                    {
                        throw new Error('Required Date');
                    }   
                
                    
            }
            else if(Form.formData[0].data[i].CheckBox)
                {
                    if(!ResponseForm[i].CheckBox.length)
                    {
                        throw new Error('Required CheckBox');
                    } 
                }

            else if(Form.formData[0].data[i].RadioBtn)
                {
                    if(!ResponseForm[i].RadioBtn)
                    {
                        throw new Error('Required RadioBtn');
                    } 
                }
            else if(Form.formData[0].data[i].TextBox)
            {
                if(!ResponseForm[i].TextBox)
                {
                    throw new Error('Required TextBox');
                }
            }           
        }
        else if(Form.formData[0].data[i].Required)
            {
                console.log('here in else if')
                throw new Error('Empty container')  
            }
    }
    console.log('validation has been done ')
    next()
}
catch(error)
{
    console.log('cathing the error',error);
    res.status(400).json({ error: error.message });
}

}

Frouter.get('/validate',(req,res)=>{
    res.status(200)
})

Frouter.post('/saveform',validateform,async (req,res)=>{
    const user=req.user
    console.log('user email and form id',user,req.form)
    user.response.push({user:user.email,form:req.form,data:req.body})
    console.log('saving the form....')
    await user.save()
    res.status(200).send('Saved Form Successfully!')
})
 
Frouter.get('/responseform',async (req,res)=>{
    console.log('running response form')
   try{ 
    const id=req.query['email']
    const formid=req.query['form']
    req.user.response.map(async (value,index)=>{
        console.log('value ji',value)
        if(value.user == id && value.form == formid)
        {
            let Form=await form.findById(value.form);
            console.log('sending the response')
            return res.status(200).send({data:value.data,originalData:Form})
        }
    })
    }
    catch(e)
    {   
        console.log("error caught in response form",e)
        return res.status(400)
    }

})
Frouter.get('/fetchforms', async (req, res) => {
    // Fetching the id of the user
    let user = req.user;
    console.log('fetchingg the forms')
    // Assuming user.forms contains references to forms
    let formReferences = user.forms;
    let forms = [];
    
    // Simulating fetching the actual form data using form references
    for (let formReference of formReferences) {
        const fo = await form.findById(formReference);
        
        if (fo) {
            forms.push(fo);
        }
    }
    
    res.status(200).send(forms.length > 0 ? { 'formsdata': forms } : { 'formsdata': null });
});

Frouter.get('/getform',async(req,res)=>{
    const formid=req.query['id']       
    console.log('formid',formid)
    try {
        // Fetch the form using the ObjectId
        const Form = await form.findById(formid);
    
        if (!Form) {
          return res.status(404).json({ message: 'Form not found' });
        }
    
        // Form found, send it to the client
        res.status(200).send({'data':Form.formData});
      } catch (error) { 
        console.error('Error fetching form:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

})

Frouter.post('/createform', async (req, res) => {
    try {
        let data = req.body;
        let User= req.user
        console.log('data received on the server!', data);

        // Create a new form entry in the Form collection
        const newForm = new form({
            // Assuming you have fields in the form schema that correspond to the data
            formData:data
            // ... other fields
        });

        // Save the new form entry
        const savedForm = await newForm.save();
        User.forms.push(savedForm._id)
        await User.save()
        console.log('form id created',savedForm._id)
        res.status(200).json({ message: 'Form created successfully.' });
    } catch (error) {
        console.error('Error creating form:', error);           
        res.status(500).json({ error: 'An error occurred while creating the form.' });
    }
});

Frouter.delete('/deleteform:id',async (req,res)=>{
    const formIdToDelete = req.query['id']
    const userId = req.user._id; 

    try {
        // Delete the form reference from the user's forms 
        await User.findByIdAndUpdate(userId, { $pull: { forms: formIdToDelete } });

        // Delete the form document from the forms collection
        await form.findByIdAndDelete(formIdToDelete);

        res.status(200).send({ 'form': formIdToDelete });
    } catch (error) {
        res.status(500).send('Internal server error');
    }})

Frouter.put('/updateform',async(req,res)=>{
    try {
        const formId = req.query['id'];
        const updatedData = req.body;
        
        const existingForm = await form.findById(formId);
        
        if (!existingForm) {
          return res.status(404).send({ message: 'Form not found' });
        }
        existingForm.formData = updatedData;
        const updatedForm = await existingForm.save();
        
        return res.status(200).send({ form: updatedForm });
      } catch (error) {
        console.error('Error updating form:', error);
        return res.status(500).send({ message: 'Error updating form' });
      }
})

module.exports=Frouter
