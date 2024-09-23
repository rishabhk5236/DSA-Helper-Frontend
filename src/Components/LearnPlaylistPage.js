import React from "react";
import "../CSS/PlaylistPage.css";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function LearnPlaylistPage (props) {
 
  const [collapseState,setCollapseState]=useState("show");
  const [loading,setLoading]=useState(false);
  const [playlists,setPlaylists]=useState([]);
  const [videoId,setVideoId]=useState(localStorage.getItem('playlistVideoId'));
  const [position,setPositition]=useState(0);
  const [videoTitle,setVidoeTitle]=useState("");
  const [videoDesc,setVideoDesc]=useState("");
  const [p_listid,setP_listid]=useState(localStorage.getItem('playlistid'));
  const [totalResults,setTotalResults]=useState(0);
  const [morebutton,setMoreButton]=useState("More");
  const [nextPageToken,setNextPageToken]=useState("");
  const [publishedAt,setPublishedAt]=useState("");

  const navigate=useNavigate();


  const formatDescription=(string)=> {
    const newString = string.replace(/\n/g, "\n");
    return newString;
  }

  const handleCollapseClick = () => {
    collapseState === "Show"?
      // ? setState({ collapseState: "Hide" })
      setCollapseState("Hide"):setCollapseState("Show");
      // : setState({ collapseState: "Show" });
  };

  const handleSideBarClick = (po) => {
    props.setProgress(10);

    setPositition(po);
    setVideoId(playlists[po].snippet.resourceId.videoId);
    setVidoeTitle(playlists[po].snippet.title);
    setVideoDesc(playlists[po].snippet.description);
    setPublishedAt(playlists[po].snippet.publishedAt);


    props.setProgress(100);
  };

  // this function sets all things while mounting of component 

  const onComponentMount=async ()=>{
    if(!localStorage.getItem('auth-token') && !localStorage.getItem('adminAuthToken')){
      navigate('/login-signup');
      props.showAlert("You are logged out because of being inactive for 30 minutes",'danger');
      return;
    }
    if(props.playlistid){
        localStorage.setItem('playlistid', props.playlistid);
    }

    
    window.scrollTo(0, 0);
    props.setProgress(10);
    setLoading(true);
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${localStorage.getItem('playlistid')}&key=AIzaSyCVox0-4KAlKOuP_6DF2Cq_Ak8uX3a2hAY`;
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
  
    setPlaylists(parsedData.items);
    setVideoId(parsedData.items[position].snippet.resourceId.videoId);
    setVidoeTitle(parsedData.items[position].snippet.title);
    setVideoDesc(parsedData.items[position].snippet.description);
    setTotalResults(parsedData.pageInfo.totalResults);
    setNextPageToken(parsedData.nextPageToken);
    setPublishedAt(parsedData.items[position].snippet.publishedAt);
    setLoading(false);

    props.setProgress(100);
    if (parsedData.items.length === parsedData.pageInfo.totalResults) {
  
      setMoreButton("You have fetched all data !");
    }
  };
  
  useEffect(()=>{
    onComponentMount();
  },[])

  const handleNextClick = () => {
    window.scrollTo(0, 0);

    setPositition(position + 1);
    setVideoId(playlists[position + 1].snippet.resourceId.videoId);
    setVidoeTitle(playlists[position + 1].snippet.title);
    setVideoDesc(playlists[position + 1].snippet.description);
    setPublishedAt(playlists[position + 1].snippet.publishedAt);
  };

  const handlePrevClick = () => {
    window.scrollTo(0, 0);
    
    setPositition(position - 1);
    setVideoId(playlists[position - 1].snippet.resourceId.videoId);
    setVidoeTitle(playlists[position - 1].snippet.title);
    setVideoDesc(playlists[position - 1].snippet.description);
    setPublishedAt(playlists[position - 1].snippet.publishedAt);
    
  };

  const handleMoreButton = async () => {
    if (playlists.length + 50 >= totalResults) {
    
      setMoreButton("You have fetched all data !");
    }
    props.setProgress(10);
   
    setLoading(true);
    props.setProgress(30);
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${p_listid}&pageToken=${nextPageToken}&key=AIzaSyCVox0-4KAlKOuP_6DF2Cq_Ak8uX3a2hAY`;

    let data = await fetch(url);
    props.setProgress(50);
    let newParsedData = await data.json();
    props.setProgress(70);
  
    setPlaylists(playlists.concat(newParsedData.items));
    setNextPageToken(newParsedData.nextPageToken);
    setLoading(false);
    props.setProgress(100);
  };

    return (
      <>
        <div className="d-flex body">
          <div className="container main-bar">
            <div className="card video-card">
              <iframe
                className="main-video card-img-top"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="card-body">
                <a
                  className="btn collapse-button"
                  data-bs-toggle="collapse"
                  href="#multiCollapseExample1"
                  role="button"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample1"
                  onClick={handleCollapseClick}
                >
                  {collapseState} Course Content
                </a>
                <div
                  className="collapse multi-collapse"
                  id="multiCollapseExample1"
                >
                  <div className="card collapse-card ">
                    {playlists.map((element) => {
                      return (
                        <Link
                          key={element.snippet.title} 
                          className="collapse-anchor"
                          onClick={() =>
                            handleSideBarClick(element.snippet.position)
                          }
                        >
                          <div className="card-body collapse-card-text ">
                            <p className="card-text">
                              {element.snippet.position + 1}.{" "}
                              {element.snippet.title}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                    {!loading && (
                      <div className="container d-flex justify-content-center">
                        <button
                          disabled={
                            playlists.length ===
                            totalResults
                          }
                          className="btn btn-light more-button"
                          onClick={handleMoreButton}
                        >
                          {morebutton}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h5 className="video-title card-title">
                  {position + 1}. {videoTitle}
                </h5>
                <p className="published-at">Published On : {new Date(publishedAt).toGMTString()}</p>
                <p className="video-text card-text">
                  <strong>Description : </strong>
                  {formatDescription(videoDesc)}
                </p>
              </div>
              <div className="container d-flex justify-content-between">
                <button
                  disabled={position === 0}
                  className="btn btn-primary main-body-button"
                  onClick={handlePrevClick}
                >
                  Previous
                </button>
                <button
                  disabled={position === totalResults - 1}
                  className="btn btn-primary main-body-button"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

{/* side bar code  */}
          <div className="container side-bar">
            <h3 className="side-bar-heading text-center">Course Content</h3>

            {playlists.map((element) => {
              return (
                <Link
                key={element.snippet.title} 
                  className="side-bar-anchor"
                  onClick={() =>
                    handleSideBarClick(element.snippet.position)
                  }
                >
                  <div className="card side-bar-card">
                    <div className="side-bar-text card-body">
                      <p className="card-text">
                        {element.snippet.position + 1}. {element.snippet.title}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
            {!loading && (
              <div className="container d-flex justify-content-center">
                <button
                  disabled={
                    playlists.length === totalResults
                  }
                  className="btn btn-light more-button"
                  onClick={handleMoreButton}
                >
                  {morebutton}
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
