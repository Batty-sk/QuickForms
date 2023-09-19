import React from 'react'
// Import the functions you need from the SDKs you need

import { useHistory } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import "./Signup.css"

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFIgZiNMqcmjecMdf32BwL2ROv0gr4jbU",
  authDomain: "quick-forms-e4a91.firebaseapp.com",
  projectId: "quick-forms-e4a91",
  storageBucket: "quick-forms-e4a91.appspot.com",
  messagingSenderId: "1035827271452",
  appId: "1:1035827271452:web:d22421c4026304412c4cd9",
  measurementId: "G-LPNYT5427Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Get the authentication instance

    function Signup() {
        const[email,setEmail]=useState('')
        const[password,setPassword]=useState('')
        const[message,setMessage]=useState()
        const[name,setName]=useState('')

        const handleSignup= async(e)=>{
            e.preventDefault()
            try{
            const user= await createUserWithEmailAndPassword(auth,email,password)

            await updateProfile(user.user, { displayName: name });
            setMessage('Register Successfull!')
            console.log("user baby",user)
            
            console.log('user accessToken',user.user)
            localStorage.setItem('accessToken',user.user.accessToken)
            localStorage.setItem('refreshToken',user.user.refreshToken)
             
            await fetch('http://localhost:8000/auth/createuser',{method:'POST',body: JSON.stringify(user.user), headers:{
                'Content-Type': 'application/json', 
              }}).then(value=>{
                console.log('value',value);
              }).catch(error=>{
                console.log('error',error)
              })
            }
            catch(error)
            {
                setMessage('error',error.message)
            }

            //useHistory('/home') when home route will be available
            
        }   

    return (
      <div className="container">
      <div className="row justify-content-center">
          <div className="col-md-6 signup-container">
              <div className="card signup-card">
                  <div className="card-body">
                      <h2 className="card-title signup-title pb-4">Sign Up</h2>
                      <form>
                          <div className="mb-3">
                              <input type="text" className="form-control signup-input" name="name" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                          </div>
                          <div className="mb-3">
                              <input type="email" className="form-control signup-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </div>
                          <div className="mb-3">
                              <input type="password" className="form-control signup-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>
                          <button type="submit" className="btn btn-primary signup-button" onClick={handleSignup}>Sign Up</button>
                      </form>
                      {message && <p className="mt-3 signup-message">{message}</p>}
                  </div>
              </div>
          </div>
      </div>
  </div>
    )
    }

    export default Signup