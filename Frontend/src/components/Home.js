import { MdAdd } from 'react-icons/md';
import Sidebar from './Sidebar';
import {Link} from 'react-router-dom'
import "./Home.css"
function Home() {       
  return (
    <div className='container-fluid ' style={{backgroundColor:'whitesmoke'}}>
      <div className="row ">
        <div className="col-12 text-center ">
          <h1 id='main-heading'><span>Q</span>uick Forms</h1>
        </div>
        <div className="col-12 " id='home'>
              <div className="row h-100 align-items-center justify-content-around">
                <div className="col-md-5 text-center mono mt-5">
                  <h2><span>Create </span> Form</h2>
                  <div className="createform">
                  <Link to='/createform'>  <i class="bi bi-plus-circle-dotted" > </i></Link>
                  </div>
                  </div>
                <div className="col-md-5 text-center mono mt-5">
                <h2> <span> My </span> Forms</h2>
                    <div className="showform">
                   <Link to="/showform"> <i class="bi bi-file-text"></i></Link>
                   </div>
                </div>
              </div>
        </div>
      

      </div>
    </div>
  )
}

export default Home