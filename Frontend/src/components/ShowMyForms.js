import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
function ShowMyForms() {
    const[forms,setForms]=useState([])
    const[message,setMessage]=useState(null)
    
    useEffect(()=>{
        try{
           let  accessToken=localStorage.getItem('accessToken')

            fetch(`http://localhost:8000/forms/fetchforms`,{method:'GET',headers:{'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
                if (!res.ok)
                    throw new Error('Not validated')
                return res.json()
            }).then(data=>{
                console.log('froms data',data.formsdata)
            setForms(data.formsdata)
            }).catch(error=>{
                console.log('here')
                setMessage('Please Login Then Try Again!')

            })
        }
        catch(e)
        {
            console.log('error while making the fetch request', e)
        }   
    },[])
  

      // on onlick on a particular form the edit form would be opened
  return (
    <>
    {message? <h1> Please Login Then Try Again </h1>:
      <div className='row'>
          <div className="col-12 text-center">
                <h1>My Forms</h1>
          </div>

          <div className="col-12 mt-5" id='my-forms'>
            <div className="row justify-content-around">
                {forms.map((value,index)=>{
                    return (
                        <Link to={`/updateform/${value._id}`} key={index}>
                        <div className="col-2 mono my-form">
                        <h3>{value.formData[0].title}</h3> 
                        </div>
                    </Link>)
                })}
                </div>
            </div>
          </div>  
}
      </>
  )
}

export default ShowMyForms