import React, { Component, useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import { useContext } from "react";
import resourcesContext from "../Context/resourcesContext";

export default function LearnVideoPage(props) {

  const context=useContext(resourcesContext);

  const {oneShotVideos,getResources}=context;


  const navigate=useNavigate();

  const [collapseState,setCollapseState]=useState("Show");
  const [videoList,setVideoList]=useState(oneShotVideos);
  const [videoId,setVideoId]=useState(localStorage.getItem('videoId'));
  const [videoTitle,setVidoeTitle]=useState("");
  const [videoDesc,setVideoDesc]=useState("");


  const formatDescription=(string)=> {
    const newString = string.replace(/\n/g, "\n");
    return newString;
  }

  const handleCollapseClick = () => {
    collapseState === "Show" ? setCollapseState("Hide"):setCollapseState("Show");
  };

  const handleSideBarClick = async (id) => {
    props.setProgress(10);
    localStorage.setItem('videoId',id);
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${localStorage.getItem('videoId')}&key=AIzaSyCVox0-4KAlKOuP_6DF2Cq_Ak8uX3a2hAY`;
    props.setProgress(20);
    
    let data = await fetch(url);
    props.setProgress(50);

    let parsedData = await data.json();
    props.setProgress(70);


    setVideoList(parsedData.items);
    setVideoId(id);
    setVidoeTitle(parsedData.items[0].snippet.title);
    setVideoDesc(parsedData.items[0].snippet.description);
    props.setProgress(100);
  };

  const componentDidMount=async()=> {
    if(!localStorage.getItem('auth-token') && !localStorage.getItem('adminAuthToken')){
      navigate('/login-signup');
      props.showAlert("You are logged out because of being inactive for 30 minutes",'danger');
      return;
    }

    if(props.videoId){
      localStorage.setItem('videoId', props.videoId);
    }

    props.setProgress(10);
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${localStorage.getItem('videoId')}&key=AIzaSyCVox0-4KAlKOuP_6DF2Cq_Ak8uX3a2hAY`;
    props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(50);

    let parsedData = await data.json();
    props.setProgress(70);

    setVideoList(parsedData.items);
    setVidoeTitle(parsedData.items[0].snippet.title);
    setVideoDesc(parsedData.items[0].snippet.description);
    props.setProgress(100);
  }

  useEffect(()=>{
    window.scroll(0,0);
    getResources();
    componentDidMount();
  },[])


    return (
      <>
        <div className="d-flex body">
          <div className="container main-bar">
            <div className="card video-card">
              <iframe
                className="main-video card-img-top"
                src={`https://www.youtube.com/embed/${localStorage.getItem('videoId')}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="card-body">
                <Link
                  className="btn collapse-button"
                  data-bs-toggle="collapse"
                  to="#multiCollapseExample1"
                  role="button"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample1"
                  onClick={handleCollapseClick}
                >
                  {collapseState} Other Courses
                </Link>
                <div
                  className="collapse multi-collapse"
                  id="multiCollapseExample1"
                >
                  <div className="card collapse-card ">
                    {oneShotVideos.map((element) => {
                      return (
                        <Link key={element.title} className="collapse-anchor" onClick={() => handleSideBarClick(element.videoId)}>
                          <div className="card-body collapse-card-text ">
                            <p className="card-text">
                              {element.index}. {element.title}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <h5 className="video-title card-title">
                  {videoTitle}
                </h5>
                <p className="video-text card-text">
                  <strong>Description : </strong>
                  {formatDescription(videoDesc)}
                </p>
              </div>
            </div>
          </div>


          {/* this code is for sidebar  */}

          <div className="container side-bar">
            <h3 className="side-bar-heading text-center">Other Courses</h3>

            {oneShotVideos.map((element) => {
              return (
                <Link
                  className="side-bar-anchor"
                  onClick={() => handleSideBarClick(element.videoId)}
                  key={element.title} 
                >
                  <div className="card side-bar-card">
                    <div className="side-bar-text card-body">
                      <p className="card-text">
                        {element.index}. {element.title}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
  }

