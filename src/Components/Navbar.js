import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import navLogo from "../MediaResources/Navbar/NavBarLogo.png";
import "../CSS/Navbar.css";
import cross from "../MediaResources/Navbar/cross.png";
import home from "../MediaResources/Navbar/Home.png";
import learn from "../MediaResources/Navbar/Learn.png";
import userProfileLogo from "../MediaResources/Navbar/userProfileLogo.png";
import resourceLogo from "../MediaResources/Navbar/resourcesLogo.png";
import questionPapersLogo from "../MediaResources/Navbar/questionPapersLogo.png";
import Skateloader from "../MediaResources/Navbar/SkateLoader.gif";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import resourcesContext from "../Context/resourcesContext";
import { useEffect } from "react";
import { Button } from "@mui/material";
import QuizLogo from '../MediaResources/Navbar/Quiz.png';

export default function Navbar(props) {
  const navigate = useNavigate();

  const context = useContext(resourcesContext);
  const { userDetails, getUserDetails, adminDetails, getAdminDetails } =
    context;

  const location = useLocation();
  const refCloseOffCanvas = useRef();

  // this is to handle the navigation button click

  // this is code for getting the age from date of birth 
  const  calculateAge=(dateOfBirth)=> {
    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // this code is for getting the first name from the full name

  const getFirstName = (name) => {
    const firstName = name.split(" ")[0];
    return firstName;
  };

  const navButtonClickHandle = () => {
    props.setProgress(100);
    refCloseOffCanvas.current.click();
  };

  // this code is for handleing the logout button
  const handleLogOutClick = () => {
    localStorage.removeItem("auth-token");
    toast.success("Logged Out Successfully", {
      toastId: "loggedOut",
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
    navigate("/login-signup");
  };

  // this code is for handling logout of admin
  const handleAdminLogOutClick = () => {
    localStorage.removeItem("adminAuthToken");
    toast.success("Logged Out Successfully", {
      toastId: "AdminloggedOut",
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
    navigate("/login-signup");
  };

  useEffect(() => {
    if (localStorage.getItem("adminAuthToken")) {
      getAdminDetails();
    } else if (localStorage.getItem("auth-token")) {
      getUserDetails();
    }
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand me-3 navbar-buttons"
            to="/"
            onClick={() => props.setProgress(100)}
          >
            <img
              className="me-2"
              src={navLogo}
              alt="."
              width="40"
              height="40"
            />
            DSA Helper
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navBarOffcanvas"
            aria-controls="offcanvasRight"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="navBarOffcanvas"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h6 id="offcanvasRightLabel">Menu</h6>
              <img
                src={cross}
                alt=".."
                type="button"
                id="cross"
                ref={refCloseOffCanvas}
                className="text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body justify-content-end">
              <ul className="navbar-nav ml-auto">
                <li
                  className={`nav-item ${
                    location.pathname === "/"
                      ? "locationChangeNavItemStyle"
                      : ""
                  }`}
                >

                  {(localStorage.getItem("auth-token") ||
                    localStorage.getItem("adminAuthToken")) && (
                    <Link
                      className="nav-link  me-3 navbar-buttons"
                      aria-current="page"
                      id="home"
                      to="/"
                      onClick={navButtonClickHandle}
                    >
                      <img src={home} alt=".." />
                      Home
                    </Link>
                  )}
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/learn"
                      ? "locationChangeNavItemStyle"
                      : ""
                  }`}
                >
                  {(localStorage.getItem("auth-token") ||
                    localStorage.getItem("adminAuthToken")) && (
                    <Link
                      className="nav-link  me-3 navbar-buttons"
                      aria-current="page"
                      id="learn"
                      to="/learn"
                      onClick={navButtonClickHandle}
                    >
                      <img src={learn} alt=".." />
                      Learn
                    </Link>
                  )}
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/resources"
                      ? "locationChangeNavItemStyle"
                      : ""
                  }`}
                >
                  {localStorage.getItem("adminAuthToken") && (
                    <Link
                      className="nav-link  me-3 navbar-buttons"
                      aria-current="page"
                      id="resource"
                      to="/resources"
                      onClick={navButtonClickHandle}
                    >
                      <img src={resourceLogo} alt=".." />
                      Resources
                    </Link>
                  )}
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/question-papers-notes"
                      ? "locationChangeNavItemStyle"
                      : ""
                  }`}
                >
                  {(localStorage.getItem("auth-token") ||
                    localStorage.getItem("adminAuthToken")) && (
                    <Link
                      className="nav-link  me-3 navbar-buttons"
                      aria-current="page"
                      id="questionPaper"
                      to="/question-papers-notes"
                      onClick={navButtonClickHandle}
                    >
                      <img src={questionPapersLogo} alt=".." />
                      Question Papers / Notes
                    </Link>
                  )}
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/quiz"
                      ? "locationChangeNavItemStyle"
                      : ""
                  }`}
                >
                  {(localStorage.getItem("auth-token") ||
                    localStorage.getItem("adminAuthToken")) && (
                    <Link
                      className="nav-link  me-3 navbar-buttons"
                      aria-current="page"
                      id="quiz"
                      to="/quiz"
                      onClick={navButtonClickHandle}
                    >
                      <img src={QuizLogo} alt=".." />
                      Quiz
                    </Link>
                  )}
                </li>

                <li
                  className={`nav-item ${
                    location.pathname === "/profile"
                      ? "locationChangeNavItemStyle"
                      : ""
                  }`}
                >
                  {/* this is the dropdown for getting the user/admin profile details  */}
                  {(localStorage.getItem("auth-token") ||
                    localStorage.getItem("adminAuthToken")) && (
                   
                    <div className="dropdown">
                      <button
                        className="dropdown-toggle nav-link me-3 navbar-buttons userProfile"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={userProfileLogo} alt=".." />
                        {localStorage.getItem("adminAuthToken")
                          ? getFirstName(adminDetails.name)
                          : getFirstName(userDetails.name)}
                        {localStorage.getItem("adminAuthToken") && (
                          <span className="ms-2">&#9733;</span>
                        )}
                      </button>
                      <ul className="dropdown-menu userProfileDropDown">
                        {/* this is the code for user card */}
                        <li>
                        <div className="card dropdown-item">
                <div className="card-body">
                  <h5 className="card-title">{localStorage.getItem("adminAuthToken")
                          ? adminDetails.name
                          : userDetails.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">E-mail:{localStorage.getItem("adminAuthToken")
                          ? adminDetails.email
                          : userDetails.email}</h6>
                  <p className="card-text">Mobile: {localStorage.getItem("adminAuthToken")
                          ? adminDetails.mobile
                          : userDetails.mobile}</p>
                  <p className="card-text">Age: {localStorage.getItem("adminAuthToken")
                          ? calculateAge(adminDetails.dateOfBirth)
                          :calculateAge(userDetails.dateOfBirth)}</p>

                  </div>
              </div>
              </li>
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
              {!(
                localStorage.getItem("auth-token") ||
                localStorage.getItem("adminAuthToken")
              ) && (
                <div
                  className="btn-group d-flex justify-content-center"
                  role="group"
                  aria-label="Basic example"
                >
                  <Link
                    to="/login-signup"
                    type="button"
                    className="btn signUpLoginbtn btn-outline-light"
                    onClick={navButtonClickHandle}
                  >
                    SignUp/Login
                  </Link>
                </div>
              )}
              {localStorage.getItem("auth-token") && (
                <button
                  className="btn signUpLoginbtn btn-outline-light"
                  onClick={handleLogOutClick}
                >
                  Logout
                </button>
              )}

              {localStorage.getItem("adminAuthToken") && (
                <button
                  className="btn signUpLoginbtn btn-outline-light"
                  onClick={handleAdminLogOutClick}
                >
                  Logout As Admin
                </button>
              )}

              <div className="gif-loader">
                <img src={Skateloader} alt=".." width={100} />
              </div>
              <div className="loadertext text-center">
                <p>Keep Moving and Keep Husteling...</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
