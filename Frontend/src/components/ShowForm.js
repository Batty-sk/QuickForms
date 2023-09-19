import React, { useEffect, useState } from "react";
import FormRender from "./FormRender";
import { useNavigate } from 'react-router';

import {useParams} from 'react-router-dom'
import "./FormRender.css"
function ShowForm() {
  // get the data at the componenet mount
    const[formdata,setFormData]=useState(null)
    const[newData,setNewData]=useState({})
    const navigate = useNavigate();

    const {id}=useParams();
    const[message,setMessage]=useState('')
    useEffect(() => {
      const accessToken=localStorage.getItem('accessToken')
      console.log(accessToken,'accesstoken')
      fetch(`http://localhost:8000/forms/getform?id=${id}`,{method:'GET',headers:{
        'Content-Type':'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
          if (!res.ok) {
            throw new Error(res.message);
          }
          return res.json()
        }).then(data=>{
          console.log('data here ',data)
          setFormData({title:data.data[0].title,data:data.data[0].data})
          let newdata=[...data.data[0].data]
          setNewData(newdata)
          
        }).catch(err=>{
          setMessage({message:err})
          console.log('err',err)
          
        })
    }, []);// setNewData([...newData,{}]) 

    const handleSave=()=>{
    // requesting.. to the server using fetch api
    console.log('new data before saving...',newData)
    const accessToken=localStorage.getItem('accessToken')
    fetch(`http://localhost:8000/forms/saveform?id=${id}`,{method:'POST',headers:{
      'Content-Type':'application/json','Authorization': `Bearer ${accessToken}`},body:JSON.stringify({title:formdata.title,data:newData})}).then(res=>{
        if(!res.ok)
         { return res.json().then(errorData => {
            throw new Error(errorData.error) })
        }
        //redirect to the thank you page 
        
        console.log('Thank you for Responding.... :)')
        navigate('/thank-you');
      })
      .catch(error=>
      {
        setMessage(error)
        console.log('Error occured',error)
      })
    }

    const saveData=(index,data)=>{
            console.log('coming here')
            let newdata=[...newData]
            newdata[index]=data
            console.log('new data',newdata)
            setNewData(newdata)
    }
    const handleClear=()=>{

    }
    return (
      <div>
        
      {formdata?<div className="container">
      <div className="row">
        <div className="col-12 bg-dark text-white text-center">
          <h1>{formdata.title || 'Untitle Form' }</h1>
          
        </div>

        <div className="col-12">{
            formdata.data.map((value,index)=>
            {
                return <FormRender key={index} index={index} data={value} saveData={saveData} filledData={false}/>}
            )
        }</div>
     
        <div className="col-12 text-center mono mt-4">
          <button className="btn btn-success ps-2 pe-2 me-2" onClick={handleSave}>
            Submit
          </button>
          <button className="btn btn-danger ps-2 pe-2" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>:<h1>loading....</h1>}

    <div className="col-12 text-center text-danger mono bg-dark">
          <h4>{message.message}</h4>
        </div>
      </div>
  );
}

export default ShowForm;
