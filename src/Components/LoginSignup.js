import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useEffect } from "react";
import { useRef } from "react";
import "../CSS/LoginSignup.css";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import otpLoading from '../MediaResources/LoginSignup/otpLoading.gif'
import { useNavigate} from "react-router-dom";
import sideImage from '../MediaResources/LoginSignup/sideImageOfLginSignupPage.gif'
import loginLoader from '../MediaResources/LoginSignup/LoginLoader.gif';




export default function LoginSignup(props) {

  useEffect(()=>{
    props.setProgress(100);
  },[])

// this is for navigating between pages 
const navigate=useNavigate();

  const resetPasswordModalOpen=useRef();
  const resetPasswordModalClose=useRef();

  const host=props.base_url;
  const [LS_state, setLS_state] = useState("login");
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({ name:"",email: "", password: "",cpassword:"" ,mobile:"",dateOfBirth:"",otp:""});
  const [resetPasswordInput,setResetPasswordInput]= useState({email:"",dateOfBirth:"",newpassword:"",cpassword:"",otp:""});
  const [otpState,setOtpState]=useState("Get Otp");
  const [otpSendingState,setOtpSendingState]=useState(false);
  let [OTP,setOTP]=useState("");

  const [loginLoading,setLoginLoading]=useState(false);

  const [loading,setLoading] = useState(false);
  // this state gets trigger when the loading time is too long 
  const [loginDelay,setLoginDelay] = useState(false);
  
  let [wrongOtp,SetWrongOtp]=useState(false);



  // this is to show the password 
  
  const checkOnChange=()=>{
    let password = document.querySelector('#password');
    let cpassword = document.querySelector('#cpassword');
    const type=password.getAttribute('type')==='password'?'text':'password';
    password.setAttribute('type',type);
    cpassword.setAttribute('type',type);
  }

  const checkOnLoginChange =()=>{
    let password = document.querySelector('#password');
    const type=password.getAttribute('type')==='password'?'text':'password';
    password.setAttribute('type',type);
  } 
  
  const forgotPasswordShowOnChange=()=>{
    let newpassword = document.querySelector('#newpassword');
    let cpassword = document.querySelector('#cforgotpassword');

    const type=newpassword.getAttribute('type')==='password'?'text':'password';
    newpassword.setAttribute('type',type);
    cpassword.setAttribute('type',type);
  }

  //this code is for updating/resetting password 

  const handleUpdatePassword= async (e)=>{
    e.preventDefault();
    setLoading(true);


    if(resetPasswordInput.otp!==OTP){
      SetWrongOtp(true);
      return;
    }else{
      SetWrongOtp(false);
    }




    if(resetPasswordInput.newpassword!==resetPasswordInput.cpassword){
      toast.error("Password and Confirm Password must be same", {
        toastId: "confirmforgotPassword",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })

    setLoading(false);

      return;
    }


    const {email,dateOfBirth,newpassword} = resetPasswordInput;

    const response = await fetch(`${host}/api/auth/resetpassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,dateOfBirth,newpassword}),
    });

    const json=await response.json();

    if(json.success){
      resetPasswordModalClose.current.click();
      toast.success(json.message, {
        toastId: "passwordUpdated",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
    }
    else{
      toast.error(json.message, {
        toastId: "passwordUpdatingError",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
    }




  }
  // this code is for login

  const handleLogin = async (e)=> {

    
    setLoading(true);

    // setting login delay 
    setTimeout(function() {
      setLoginDelay(true);
    }, 10000);

    props.setProgress(10);
    e.preventDefault();
    
    
    const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email:loginInput.email,password:loginInput.password}),
    });
    props.setProgress(30);

    const json=await response.json();
    
    
    if(json.success){
        localStorage.setItem('auth-token',json.authToken);
        toast.success("Login Successful", {
            toastId: "loginSuccessful",
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
        })
        navigate('/');
    }else{
        toast.error(json.error, {
            toastId: "loginUnsuccessful",
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
        })
        props.setProgress(100);
        setLoading(false);
        
        return ;
    }
    
    props.setProgress(100);

  };

  const loginInputOnChange = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };


  // this code is for signup

  const handleSignup=async (e)=>{


    
    setLoading(true);

    // setting login delay 
    setTimeout(function() {
      setLoginDelay(true);
    }, 10000);

    
    e.preventDefault();
    props.setProgress(10);

    if(signupInput.otp!==OTP){
      SetWrongOtp(true);
      return;
    }else{
      SetWrongOtp(false);
    }

    if(signupInput.password!==signupInput.cpassword){
      toast.error("Password and Confirm Password must be same", {
        toastId: "confirmSigninPassword",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
      setLoading(false);
      props.setProgress(100);
      return;
    }
    
    
    const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name:signupInput.name,email:signupInput.email ,password:signupInput.password ,mobile:signupInput.mobile,dateOfBirth:signupInput.dateOfBirth  }),
    });
    const json=await response.json();
    props.setProgress(30);
    
    
    if(json.success){
        localStorage.setItem('auth-token',json.authToken);
        toast.success("New Account Created", {
            toastId: "NewAccountCreated",
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
        })
        navigate('/');
    }
    else{
        toast.error(json.error, {
            toastId: "UserExists",
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
        })
    }
    props.setProgress(100);
    
  }

  const signUpInputOnChange=(e)=>{
    setSignupInput({...signupInput,[e.target.name]:e.target.value});
    SetWrongOtp(false);
  }


  // this code is for resetting password 

  const handleResetPasswordOnChange=(e)=>{
      setResetPasswordInput({...resetPasswordInput,[e.target.name]:e.target.value});
  }

  // this function is for sending the otp to user 

  const handleSendOtpForSignIn=async (e)=>{
    e.preventDefault();

    if(signupInput.email==="" || signupInput.name==="" || signupInput.dateOfBirth==="" || signupInput.password==="" || signupInput.cpassword==="" || signupInput.mobile===""){
      toast.warn("Please Fill all the details before requesting for OTP", {
        toastId: "signininputCheckForOtp",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
      return;
    }


    setOtpSendingState(true);

    // setting otp 
    const min = 100000; // Minimum value for 6-digit number
    const max = 999999; // Maximum value for 6-digit number
    const random= Math.floor(Math.random() * (max - min + 1)) + min;
    let otp=random.toString(); 
    setOTP(otp);



    let subject="Creating New Account";
    let htmlText=`<h3>Welcome to DSA Helper</h3> 
    Hello ${signupInput.name}, We are happy that you want to take part in this evolutionary way of learning, Your otp for signing in is :<b>${otp}</b><br>Please do not share this otp with anyone.<br><br>Thanks & Regards<br>DSA Helper Team`;


      // calling the api for sending the mail 


      const response = await fetch(`${host}/api/sendMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:signupInput.email,subject,htmlText}),
      });
      const json=await response.json();

    if(json.success){
    setOtpState("Resend Otp");
    setOtpSendingState(false);
    toast.success("Otp Sent", {
      toastId: "otpSent",
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    })

    }else{
      toast.error("Please Enter the right email id", {
        toastId: "wrongEmail",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
    setOtpSendingState(false);
    }
    
  }

  // this is for sending otp while resetting password 
  const handleSendOtpForForgotPassword=async (e)=>{
    e.preventDefault();

    if(resetPasswordInput.email==="" ||  resetPasswordInput.dateOfBirth==="" || signupInput.newpassword==="" || resetPasswordInput.cpassword===""){
      toast.warn("Please Fill all the details before requesting for OTP", {
        toastId: "signininputCheckForOtp",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
      return;
    }


    setOtpSendingState(true);

    // setting otp 
    const min = 100000; // Minimum value for 6-digit number
    const max = 999999; // Maximum value for 6-digit number
    const random= Math.floor(Math.random() * (max - min + 1)) + min;
    let otp=random.toString(); 
    setOTP(otp);



    let subject="Reset Password";
    let htmlText=`<h3>Welcome to DSA Helper</h3> 
    Sorry for your inconvenience, Your otp for Resetting password is :<b>${otp}</b><br>Please do not share this otp with anyone.<br><br>Thanks & Regards<br>DSA Helper Team`;


      // calling the api for sending the mail 


      const response = await fetch(`${host}/api/sendMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:resetPasswordInput.email,subject,htmlText}),
      });
      const json=await response.json();

    if(json.success){
    setOtpState("Resend Otp");
    setOtpSendingState(false);
    toast.success("Otp Sent", {
      toastId: "otpSent",
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    })

    }else{
      toast.error("Please Enter the right email id", {
        toastId: "wrongEmail",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
    setOtpSendingState(false);
    }
    
  }

  return (
    <>
    <div className="mainLoginSignup d-flex justify-content-center ">

      {loading && <div className="loginLoader">
        <img src={loginLoader} alt="logging in"/>
        
        {!loginDelay && <p>Logging you in....</p>}
        {loginDelay && <p>Loggin you in... It may take a while...</p>}


      </div>}


      <div className="sideOfLogin_signupPage">
      <img src={sideImage} alt="..." />

      </div>


      <div className="container loginSignupBtn">


        {/* this modal is for forgetting the password  */}

        {/* <!-- Button trigger modal --> */}
      <button type="button" ref={resetPasswordModalOpen} style={{display:'none'}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ResetPasswordModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="ResetPasswordModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ResetPasswordModal">Reset Password</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              
              {/* this is modal body for resetting password  */}

              <form>
                <div className="form-group my-3">
                  <label htmlFor="forgotEmail">Email address</label>
                  <input type="email" className="form-control" id="forgotEmail" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={resetPasswordInput.email} onChange={handleResetPasswordOnChange}/>
                </div>
                <div className="form-group my-3">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" placeholder="Date Of Birth" value={resetPasswordInput.dateOfBirth} onChange={handleResetPasswordOnChange}/>
                </div>
                <div className="form-group my-3">
                  <label htmlFor="newpassword">New Password</label>
                  <input type="password" className="form-control" id="newpassword" name="newpassword" placeholder="Password" value={resetPasswordInput.newpassword} onChange={handleResetPasswordOnChange}/>
                </div>
                
               <div className="my-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="shownewpassword"
                  name="shownewpassword"
                  onChange={forgotPasswordShowOnChange}
                />
                <label className="form-check-label" htmlFor="shownewpassword">
                  Show Password
                </label>
              </div>

              <div className="form-group my-3">
                  <label htmlFor="cforgotpassword">Confirm Password</label>
                  <input type="password" className="form-control" id="cforgotpassword" name="cpassword" placeholder="Confirm Password" value={resetPasswordInput.cpassword} onChange={handleResetPasswordOnChange}/>
                </div>

                <div className="form-text" style={{display: resetPasswordInput.newpassword!==resetPasswordInput.cpassword?'inline-block':'none'}}>Password and Confirm password must be same</div>

                <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                 OTP
                </label>
                <input
                  type="text"
                  className={`form-control ${wrongOtp?"otp-warn":""}`}
                  id="otp"
                  name="otp"
                  value={resetPasswordInput.otp}
                  onChange={handleResetPasswordOnChange}
                />

                <p className={otpState==='Resend Otp'?'getOtpTextAfterClick':'getOtpText' } onClick={handleSendOtpForSignIn}>{otpSendingState}</p>

                { otpSendingState && <div className="container d-flex m-0">
                  <img src={otpLoading} className="otpLoading" alt="..." />
                  <p className="otpLoadingText">Sending Otp...</p>
                </div>}


                {!otpSendingState && <p className="getOtp" onClick={handleSendOtpForForgotPassword}>{otpState}</p>}
              </div>
                
              </form>
            </div>


            <div className="modal-footer">
              <button type="button" ref={resetPasswordModalClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success" onClick={handleUpdatePassword}>Save Password</button>
            </div>
          </div>
        </div>
      </div>


        {/* this code is for login form  */}

        <div className="container loginSignupFormContainer">
          {LS_state === "login" && (
            <form>
              <h1>Login to DSA Helper</h1>
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
                  value={loginInput.email}
                  onChange={loginInputOnChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type='password'
                  className="form-control"
                  id="password"
                  name="password"
                  value={loginInput.password}
                  onChange={loginInputOnChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showpassword"
                  name="showpassword"
                  onChange={checkOnLoginChange}
                />
                <label className="form-check-label" htmlFor="showpassword">
                  Show Password
                </label>
              </div>

              <div className="container d-flex justify-content-center">
                <button type="submit" disabled={loginInput.email==="" || loginInput.password===""} className="btn btn-success " onClick={handleLogin}>
                  Login
                </button>
              </div>

              <div className="bottomRegisterLink d-flex justify-content-between">
                <div className="d-flex">
                <p>Don't have an account ?</p>
                <p
                  className="link"
                  onClick={() => {
                    setLS_state("signup");
                  }}
                >
                  {" "}
                  Register
                </p>
                </div>
                <div>
              <p className="link" onClick={()=>{resetPasswordModalOpen.current.click()}}>Forget Password ?</p>
              </div>
              </div>
            </form>
          )}

          {/* this code is for sign up form  */}

          {LS_state === "signup" && (
            <form>
              <h1>Sign up to DSA Helper</h1>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="name"
                  name="name"
                  value={signupInput.name}
                  onChange={signUpInputOnChange}
                />
              </div>
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
                  value={signupInput.email}
                  onChange={signUpInputOnChange}
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
                  value={signupInput.password}
                  onChange={signUpInputOnChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                  value={signupInput.cpassword}
                  onChange={signUpInputOnChange}
                />
                <div className="form-text" style={{display: signupInput.password!==signupInput.cpassword?'inline-block':'none'}}>Password and Confirm password must be same</div>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showpassword"
                  name="showpassword"
                  onChange={checkOnChange}
                />
                <label className="form-check-label" htmlFor="showpassword">
                  Show Password
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={signupInput.mobile}
                  onChange={signUpInputOnChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={signupInput.dateOfBirth}
                  onChange={signUpInputOnChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                 OTP
                </label>
                <input
                  type="text"
                  className={`form-control ${wrongOtp?"otp-warn":""}`}
                  id="otp"
                  name="otp"
                  value={signupInput.otp}
                  onChange={signUpInputOnChange}
                />
                {wrongOtp && <p className="form-text otp-warn-text">Invalid Otp</p>}
                <p className={otpState==='Resend Otp'?'getOtpTextAfterClick':'getOtpText' } onClick={handleSendOtpForSignIn}>{otpSendingState}</p>

                {/* Spinner Fo sending otp  */}


               { otpSendingState && <div className="container d-flex m-0">
                  <img src={otpLoading} className="otpLoading" alt="..." />
                  <p className="otpLoadingText">Sending Otp...</p>
                </div>}


                {!otpSendingState && <p className="getOtp" onClick={handleSendOtpForSignIn}>{otpState}</p>}
              </div>



              <div className="container d-flex justify-content-center">
                <button type="submit" disabled={signupInput.name==="" || signupInput.mobile==="" || signupInput.dateOfBirth==="" || signupInput.password==="" || signupInput.cpassword==="" || signupInput.otp==="" } className="btn btn-success " onClick={handleSignup}>
                  Sign Up
                </button>
              </div>

              <div className="bottomRegisterLink d-flex">
                <p>Already have an account ?</p>
                <p
                  className="link"
                  onClick={() => {
                    setLS_state("login");
                  }}
                >
                  Login
                </p>
              </div>
            </form>
          )}
        </div>

      {/* this button is for logging in as a admin */}
      <Link to="/admin-Login" className="btn btn-outline-success adminLoginBtn">Login As Admin</Link>
      </div>
    
      </div>
    </>
  );
}