import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useNavigate} from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

function ShowMyForms() {
    const[forms,setForms]=useState([])
    const[message,setMessage]=useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
        try{
           let  accessToken=localStorage.getItem('accessToken')

            fetch(`http://localhost:8000/forms/fetchforms`,{method:'GET',headers:{'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
                if (!res.ok)
                    throw new Error('Not validated')
                return res.json()
            }).then(data=>{
                console.log('froms data',data.formsdata)
                if (data.formsdata!=null)
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
  
    const handleDelete=(id)=>{
        let  accessToken=localStorage.getItem('accessToken')

        fetch(`http://localhost:8000/forms/deleteform?id=${id}`,{method:'DELETE',headers:{'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}).then(res=>{
            if(!res.ok)
                {
                    throw new  Error('Error While Deleteing')
                }
            return res.json()
                }
                ).then(data=>{
                    console.log('deleted successfully')
                    const updatedForms = forms.filter(form => form._id !== id);
                    setForms(updatedForms);

                }).catch(error=>{
                    alert('Error Occured!')
                })
    }
      // on onlick on a particular form the edit form would be opened
  return (
    <>
    {message? <h1> Please Login Then Try Again </h1>:
      <div className='row'>
          <div className="col-12 text-center">
                <h1>My Forms</h1>
          </div>

          <div className="col-12 mt-5 mb-5" id='my-forms'>
            <div className="row justify-content-around">
            {forms.length?
                forms.map((value,index)=>{
                    return (
                        <div className="col-md-3 mt-3 mt-md-0 mono my-form text-center ">

                        <Link to={`/updateform/${value._id}`} key={index} >
                            <h3 className='link-h3'>{value.formData[0].title}</h3> 
                            <i class="bi bi-journal-text"></i>
                            </Link>

                        <div className='under-form'>
                            <button className="btn btn-danger me-2" onClick={()=>{handleDelete(value._id)}}>
                            <i class="bi bi-trash3"></i></button>
                            <button className="btn btn-primary" onClick={()=>{
                                navigate(`/created-form/${value._id}`)
                            }}><i class="bi bi-link"></i></button>
                                

                        </div>
                    </div>

                    )
                })
                :<h1>No Created Form !</h1>}
                </div>
            </div>
          </div>  
}
      </>
  )
}

export default ShowMyForms