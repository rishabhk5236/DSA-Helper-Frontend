import React, { useEffect, useState } from "react";
import "../CSS/Learn.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import resourcesContext from "../Context/resourcesContext";

export default function Learn(props) {
  
  const context=useContext(resourcesContext);

  const {playlist,animatedVideos,oneShotVideos,getResources}=context;

  const host = props.base_url;



  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("auth-token") || localStorage.getItem('adminAuthToken')) {
      window.scrollTo(0, 0);
      getResources();
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
      <div className="container">
        <h1 className="heading">Animated Concepts</h1>
        <div className="row d-flex justify-content-center videosSection">
          {animatedVideos.map((element) => {
            return (
              <div
                key={element.title}
                className="card text-center col-md-4"
                id="containerLearn"
              >
                <img
                  className="learnCardImg card-img-top"
                  src={element.imageUrl}
                  alt=".."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {element.index + ". " + element.title}
                  </h5>
                  <p className="learnCardText">by-{element.author}</p>
                  <Link
                    to="/playlistpage"
                    className="btn btn-outline-success text-end"
                    onClick={() => props.setplaylistid(element.playlistId)}
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <h1 className="heading">Courses Playlists</h1>
        <div className="row d-flex justify-content-center videosSection">
          {playlist.map((element) => {
            return (
              <div
                key={element.title}
                className="card text-center col-md-4"
                id="containerLearn"
              >
                <img
                  className="learnCardImg card-img-top"
                  src={element.imageUrl}
                  alt=".."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {element.index + ". " + element.title}
                  </h5>
                  <p className="learnCardText">by-{element.author}</p>
                  <Link
                    to="/playlistpage"
                    className="btn btn-outline-success text-end"
                    onClick={() => props.setplaylistid(element.playlistId)}
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="heading">One-Shot Courses</h1>

        <div className="row d-flex justify-content-center videosSection">
          {oneShotVideos.map((element) => {
            return (
              <div
                key={element.title}
                className="card text-center col-md-4"
                id="containerLearn"
              >
                <img
                  className="learnCardImg card-img-top"
                  src={element.imageUrl}
                  alt=".."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {element.index + "." + element.title}
                  </h5>
                  <p className="learnCardText">by-{element.author}</p>
                  <Link
                    to="/oneshotvideospage"
                    className="btn btn-outline-success text-end"
                    onClick={() => props.setvideoid(element.videoId)}
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
