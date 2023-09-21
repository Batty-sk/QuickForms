import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TheResponses.css'
function TheResponses() {

    const [responses,setresponses]=useState(null)

useEffect(()=>{
    const accessToken=localStorage.getItem('accessToken')
    fetch('http://localhost:8000/forms/getresponses',{method:'GET', headers:{'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
        if(!res.ok)
        {
            throw new Error('Error Occured!')
        }
        return res.json()
    }).then(data=>{
        console.log(data)
        setresponses(data.responses)
    }).catch(error=>{
        console.log( ' some error found ! ')
    })
},[])
  return (
    <>
    <div className="container-fluid">

        <h1 className=' mb-5'>Responses</h1>
        <div className="row mono">

                {responses!=null && responses.length ?
                responses.map((value,index)=>{
                    return (
                        <Link to={`/response/${value.user}/${value.form.id}`} className='link'>
                    <div className="col-12 respo-container">
                                <div className='row'>
                                    <div className="col-4">
                                    <h4 className='title'>From</h4>
                                    <h5 className='respo-val'>{value.user}</h5>
                                    </div>
                                    <div className="col-8">
                                        <h4 className='title'>Title</h4>
                                        <h5 className='respo-val'>{value.form.title}</h5>
                                    </div>
                                </div>

                    </div>
                    </Link>
                    )
                })    
            :<h2>Empty !</h2>}

        </div>

    </div>
    </>
  )
}

export default TheResponses