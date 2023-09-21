import React from 'react'
import {useParams,Link} from 'react-router-dom'

function ShowFormLink() {

    const {id}=useParams()
  return (
    <div className="container bg-dark">
        <div className='text-white mono text-center'>
            <h3>Your Form Link</h3>
            <Link to={`/form/${id}`} className=' text-white'>/form/{id}</Link>
        </div>
    </div>
  )
}

export default ShowFormLink