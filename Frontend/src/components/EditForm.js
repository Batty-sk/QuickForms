import React, { useState } from 'react'
import { useEffect } from 'react'
import FormBox from './FormBox'
import { useParams } from 'react-router-dom';

function EditForm() {
    const {id}=useParams()
    const[formdata,setFormData]=useState([])
    const[title,setTitle]=useState('')
    const[message,setMessage]=useState('')

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
          fetch(`http://localhost:8000/forms/updateform?id=${id}`,{method:'PUT',body:JSON.stringify({title:title,data:formdata}),headers:{'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
            //redirect to the link page where the current form link will be genereated after saving.
            if(!res.ok)
                throw Error(res.status)
          }).then(res=>{
            console.log('successfully created!')
            setMessage('Updated Successfully !');
          })
          .catch(error=>{
            console.log('error while creating the form',error)
            setMessage('An Error Occured')
          })
        }
    }

    useEffect(()=>{
        const accessToken=localStorage.getItem('accessToken')
        fetch(`http://localhost:8000/forms/getform?id=${id}`,{method:'GET',headers:{'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
            //redirect to the link page where the current form link will be genereated after saving.
            return res.json()
          }).then(res=>{
            setFormData(res.data[0].data)   
            console.log('setting form data ',res.data)         
            setTitle(res.data[0].title)
          })
          .catch(error=>{
            console.log('error',error)
          })
    },[])


  return (
    <div className='container mb-5' id='createform'>
    <div className="row justify-content-center">
      <div className="col-12">
          <div contentEditable={true} onBlur={(e)=>{
                  console.log('value',e.target.textContent)
                  setTitle(e.target.textContent)}} role="textbox" id='form-title'>
                  {title || 'Untitle Form'} 
              </div>
      {formdata.map((value,index)=>{
          return <FormBox key={index} setBox={setBox}  index={index} data={formdata[index]}/>
      })}   
      </div>
      <div className="col-8 text-center mt-3" id='add-more'>
      <span  onClick={handleAddMore} className="btn  w-100" ><i class="bi bi-plus-lg"></i></span>
    </div>
  <div className="row">
    <div className="col-12 text-end mt-3 mb-3">
      <button className="btn bg-success me-2 text-white" onClick={handleSubmit}><i class="bi bi-cloud-plus-fill"></i></button>
    </div>  
  </div>
  </div>
  <div className='text-center mono bg-white'><h3 className='text-success'>{message}</h3></div>
</div>

  )
}


export default EditForm