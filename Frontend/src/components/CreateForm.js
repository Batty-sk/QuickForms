import React, { useEffect, useState } from 'react'
import FormBox from './FormBox'
import "./CreateForm.css"

function CreateForm() {

    const[formdata,setFormData]=useState([])
    const[title,setTitle]=useState('Untitle Form')
    const [message,setMessage]=useState(null)
    const [status,setStatus]=useState(null)

    useEffect(()=>{
      try{
      const accessToken=localStorage.getItem('accessToken')
        fetch('http://localhost:8000/forms/validate',{method:'GET',headers:{'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
          if (!res.ok)
              setMessage('Not Authorized !')
        }).catch(e=>{
          console.log('error occured while verifying')
        })
      }
      catch(e)
      {
        console.log('error happen while verifying')
      }
    },[])
    const setBox=(key,obj)=>
    {
        console.log('box data and index',obj,key)
        let arr=[...formdata]
        arr[key]=obj
        setFormData(arr)

    }   

    const handleAddMore=()=>{ 
        setFormData([...formdata,{}])
    }
    const handleSubmit=()=>{

        console.log('final form data',formdata)
        const accessToken=localStorage.getItem('accessToken')
        if (formdata.length){
          fetch('http://localhost:8000/forms/createform',{method:'POST',body:JSON.stringify({title:title,data:formdata}),headers:{'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
            //redirect to the link page where the current form link will be genereated after saving.
            if(!res.ok)
            throw new Error("Authentication failed!")

          return res.json()
          }).then(res=>{
           
            console.log('successfully created!')
    
            setStatus('created Successfully')
          })
          .catch(error=>{
            console.log('error while creating the form',error)
            setStatus('Error!')
          })
        }
    }
  return (
    <>
    {message?<h1>{message}</h1>:
    <div className='container mb-5' id='createform'>
        <div className="row justify-content-center">
          <div className="col-12">
              <div contentEditable={true} onBlur={(e)=>{
                      console.log('value',e.target.textContent)
                      setTitle(e.target.textContent)}} role="textbox" id='form-title'>
                      {title || 'Untitle Form'} 
                  </div>
          {formdata.map((value,index)=>{
              return  <FormBox key={index} setBox={setBox}  index={index} data={false}/>
          })}   
          </div>
          <div className="col-8 text-center mt-3" id='add-more'>
          <span  onClick={handleAddMore} className="btn  w-100" ><i class="bi bi-plus-lg"></i></span>
        </div>
      <div className="row">
        <div className="col-12 text-end mt-3 mb-3">
          <button className="btn bg-success me-2 text-white" onClick={handleSubmit}><i class="bi bi-cloud-plus-fill"></i></button>
          <button className="btn btn-danger mono">Reset</button>
        </div>
      </div>
      <div className="col-12">
        {status}
      </div>
      </div>
    </div>
  }
 </>
  )
}

export default CreateForm