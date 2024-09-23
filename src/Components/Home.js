import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import homePageAnimatedText from "../Data/homePageAnimatedText.json";
import homeGreetPng from "../MediaResources/Home/homeGreetPng.png";
import "../CSS/Home.css";
import { Link } from "react-router-dom";
import dsLogo from "../MediaResources/Home/DataStructureCardLogo.png";
import algorithmLogo from "../MediaResources/Home/AlgorithmCardLogo.png";
import pointersLogo from "../MediaResources/Home/PointersCardLogo.png";
import jobsLogo from "../MediaResources/Home/JobsLogo.png";
import explrCourse from "../MediaResources/Home/ExploreCourses.png";
import accessNotes from "../MediaResources/Home/AccessNotes.png";
import morningSunPng from "../MediaResources/Home/morningSunPng.png";
import noonSunPng from "../MediaResources/Home/noonSunPng.png";
import nightMoonPng from "../MediaResources/Home/nightMoonPng.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import resourcesContext from "../Context/resourcesContext";

export default function Home(props) {
  const [greetMsg, setGreetMsg] = useState(null);
  let [greetImgMsg, setGreetImgMsg] = useState(null);
  const navigate = useNavigate();

  // return first name
  const getFirstName = (name) => {
    const firstName = name.split(" ")[0];
    return firstName;
  };

  // Context for Resource Context

  const Context = useContext(resourcesContext);
  const { userDetails, getUserDetails, adminDetails, getAdminDetails } =
    Context;

  // this code is to change the greetTime

  const data = [
    {
      title: "Data Structures",
      description:
        "Here we understand some data structures and thier implementation like Array, Linked List, Queue ,Stack etc.",
      imageUrl: dsLogo,
      toLink: "/data-structures",
    },
    {
      title: "Algorithm",
      description:
        "In searching we mainly focuses on the searching,sorting and other algorithms.",
      imageUrl: algorithmLogo,
      toLink: "/algorithms",
    },
    {
      title: "Pointers",
      description:
        "Here we have covered a very important but very complex topic of whole programming 'The Pointers'",
      imageUrl: pointersLogo,
      toLink: "/pointers",
    },
    {
      title: "Jobs",
      description:
        "You will get the updates of all technical and non-technical jobs published by not only startups but also MNC's here.",
      imageUrl: jobsLogo,
      toLink: "/jobs",
    },
  ];

  const getGreet = () => {
    const hours = new Date().getHours();

    if (hours < 12) {
      setGreetMsg("Good Morning");
      setGreetImgMsg("morning");
    } else if (hours >= 12 && hours < 18) {
      setGreetMsg("Good Afternoon");
      setGreetImgMsg("noon");
    } else if (hours >= 18) {
      setGreetMsg("Good Evening");
      setGreetImgMsg("evening");
    }
  };

  // this code is for getting the name of the logged in person
  const getName = () => {
    if (localStorage.getItem("auth-token")) {
      return getFirstName(userDetails.name);
    } else if (localStorage.getItem("adminAuthToken")) {
      return getFirstName(adminDetails.name);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getGreet();
      getUserDetails();
      navigate("/");
      window.scrollTo(0, 0);
      props.setProgress(100);
    } else if (localStorage.getItem("adminAuthToken")) {
      getGreet();
      getAdminDetails();
      navigate("/");
      window.scrollTo(0, 0);
      props.setProgress(100);
    } else {
      navigate("/login-signup");
      props.showAlert(
        "You are logged out because of being inactive for 30 minutes",
        "danger"
      );
    }
  }, []);

  return (
    <>
      {" "}
      {/* this code is for greet card */}
      <div className="container">
        <div className="card greetCard">
          <div className="row g-0">
            <div className="content d-flex align-items-center">
              <div className="card-body ">
                <div className="bodyForHeadings">
                  <p className="content">
                    {" "}
                    {/* here we choose which photo is to be shown based on time  */}{" "}
                    {greetImgMsg === "morning" && (
                      <img src={morningSunPng} alt=".." />
                    )}{" "}
                    {greetImgMsg === "noon" && (
                      <img src={noonSunPng} alt=".." />
                    )}{" "}
                    {greetImgMsg === "evening" && (
                      <img src={nightMoonPng} alt=".." />
                    )}{" "}
                    {greetMsg} {getName()}, Happy to see you again{" "}
                  </p>
                  <h1 className="welcomeHeading"> Welcome to DSA Helper </h1>{" "}
                  <div className="animated-text">
                    {" "}
                    {/* this code is for animated Components */}{" "}
                    <h3 className="static-text"> Learn </h3>{" "}
                    <h3 className="dynamic-text">
                      <TypeAnimation
                        sequence={homePageAnimatedText}
                        wrapper="div"
                        cursor={true}
                        repeat={Infinity}
                      />{" "}
                    </h3>{" "}
                  </div>
                  <p className="belowLearnHeading">
                    We help you to be perfect in technologies by providing
                    animated videos and notes of different - different and
                    complex topics like Data Structures and Algorithms and we
                    also provide a better learning environment by providing the
                    bestest Resources of learning.{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-md-4">
              <img src={homeGreetPng} alt="..." />
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      {/* this code is for Bodymenu */}{" "}
      <div className="container">
        <h1 h1 className="text-center m-4">
          {" "}
          What 's Here !
        </h1>
        <div className="menuCardGroup row justify-content-center">
          {" "}
          {data.map((element) => {
            return (
              <div key={element.title} className="card col-md-4 menuCard">
                <img
                  src={element.imageUrl}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title"> {element.title} </h5>{" "}
                  <p className="card-text"> {element.description} </p>{" "}
                  <Link to={element.toLink} className="btn btn-success">
                    {" "}
                    {element.title === "Jobs"
                      ? "Start Exploring"
                      : "Start Learning"}{" "}
                  </Link>{" "}
                </div>{" "}
              </div>
            );
          })}{" "}
        </div>
        <h1 className="exploreHeading text-center m-4">
          You can Explore Notes and many courses here{" "}
        </h1>{" "}
      </div>
      <div className="row justify-content-center">
        <div className="card col-md-4 text-center" id="container2">
          <img className="card-img-top" src={explrCourse} alt=".." />
          <div className="card-body">
            <h5 className="card-title"> Access Notes </h5>{" "}
            <p className="card-text">
              You can access very precised notes of various subjects that can
              help you be higlighted in your class.{" "}
            </p>{" "}
            <Link
              to="/question-papers-notes"
              className="btn btn-outline-success"
              onClick={() => props.setProgress(100)}
            >
              Start Accessing{" "}
            </Link>{" "}
          </div>{" "}
        </div>
        <div className="card col-md-4 text-center" id="container2">
          <img className="card-img-top" src={accessNotes} alt=".." />
          <div className="card-body">
            <h5 className="card-title"> Explore Tutorials </h5>{" "}
            <p className="card-text ">
              Here you can Explore various number of super easy and genuine
              courses that helps you grow skills.{" "}
            </p>{" "}
            <Link
              to="/learn"
              className="btn btn-outline-success"
              onClick={() => props.setProgress(100)}
            >
              Start Exploring{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
