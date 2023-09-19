import React, { useState,useEffect } from 'react'
import FormRender from './FormRender'
import {useParams} from 'react-router-dom'
function ResponseForm() {
    const[formdata,setFormData]=useState('')
    const[newformdata,setNewData]=useState('')
    const[message,setMessage]=useState('')
    const {id}=useParams()  
    const {form}=useParams()
    console.log('running brother')
    useEffect(()=>{
      try{

        let accessToken=localStorage.getItem('accessToken')

      fetch(`http://localhost:8000/forms/responseform?email=${id}&form=${form}`,{method:'GET',headers:{
        'Content-Type':'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
          if (!res.ok) {
            throw new Error(res.message);
          } 
          return res.json()
        }).then(data=>{
          console.log('data come in the response form ',data)
          setFormData({title:data.originalData.formData[0].title,data:data.originalData.formData[0].data})
          setNewData(data.data.data)
          
        }).catch(err=>{
          setMessage(err)
          console.log('err',err)
          
        })
      }
      catch(e)
      {
        setMessage(e)
      }
    },[])

    const saveData=(index,data)=>{
}
  return (
    <div className="container">
    {formdata?
      <div className="row">
        <div className="col-12 bg-dark text-white text-center">
          <h1>{formdata.title || 'Untitle Form' }</h1>
          
        </div>

        <div className="col-12">{
            formdata.data.map((value,index)=>
            {
              console.log('new form data', newformdata[index])
                return  <FormRender key={index} index={index} saveData={saveData}  data={formdata.data[index]} filledData={newformdata[index]}/>
            }
            )
        }</div>  </div>
      :null}
                                    
    <div className="col-12 text-center mono bg-dark text-danger">
      <h4>{message}</h4>
    </div>
    </div>
  )
}

export default ResponseForm                                                                