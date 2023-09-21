import React from 'react'
import Signup from './components/Signup'
import CreateForm from './components/CreateForm'
import ShowForm from './components/ShowForm'
import EditForm from './components/EditForm'
import Signin from './components/Signin'
import ResponseForm from './components/ResponseForm'
import Home from './components/Home'
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer'
import './App.css'
import TheResponses from './components/TheResponses'
import ShowMyForms from './components/ShowMyForms'
import ThankYou from './ThankYou'
import ShowFormLink from './components/ShowFormLink'

function App() {

    return (
        <>
        <Router>
            <Routes>

            <Route path="/" Component={Home}></Route>

            <Route path="/auth/signup" Component={Signup}> </Route>

            <Route path='/auth/signin' Component={Signin}> </Route>

            <Route path='/createform' Component={CreateForm}></Route>

            <Route path='/updateform/:id' Component={EditForm}></Route>

            <Route path='/showform' Component={ShowMyForms}></Route>

            <Route path='/form/:id' Component={ShowForm}></Route>

             <Route path='/created-form/:id' Component={ShowFormLink}></Route>

            <Route path='/response/:id/:form' Component={ResponseForm}></Route>

            <Route path='/form-responses' Component={TheResponses}></Route> 

            <Route path='/thank-you' Component={ThankYou}></Route>

            </Routes>
      </Router>   

      <Footer></Footer>    
      </>    
      )
             
        }

export default App