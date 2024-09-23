import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../CSS/AdminLogin.css'

export default function AdminLoginPage(props) {

  const navigate=useNavigate();

  const [credentials,setCredentials]=useState({email:"",password:""});

  const adminInputOnchange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  const showPassword=()=>{
    let password = document.querySelector('#password');
    const type=password.getAttribute('type')==='password'?'text':'password';
    password.setAttribute('type',type);
  }

  // this code is for handleing the login of admin 

  const handleAdminLoginOnClick=async (e)=>{
    e.preventDefault();

    //this is code for logging in user 

    const response=await fetch(`${props.base_url}/api/adminAuth/admin-login`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    })

    const json=await response.json();
    if(json.success){
      toast.success("Successfully Logged In", {
        toastId: "adminLoggedIn",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
    setCredentials({email:"",password:""});
    localStorage.setItem('adminAuthToken',json.adminAuthToken);
    navigate('/');

    }else{
      toast.error(json.error, {
        toastId: "adminLoginError",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
    }

  }

  return (
    <>
    <div className="container">
      <div className="adminContainer">
        
        {/* this is for logging in  */}
        <div className="loginContainer">
      <h1>Login as Admin</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={adminInputOnchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={adminInputOnchange}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="showPassword" onChange={showPassword}/>
          <label className="form-check-label" htmlFor="showPassword">
            Show Password
          </label>
        </div>
        <button disabled={credentials.email==="" || credentials.password===""} type="submit" className="btn btn-success" onClick={handleAdminLoginOnClick}>
          Login
        </button>
      </form>
      </div>


      </div>
      
      </div>
    </>
  );
}
