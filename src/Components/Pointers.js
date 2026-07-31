import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Pointers(props) {
    const [pointersVideos, setPointersVideos] = useState([]);

  // TODO : Playlist Id
  const playlistId = "PLHJ19n5Es9XCrglAiG-Awv4WFCXIpdwYL";


  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo(0, 0);
      props.setplaylistid(playlistId);
      navigate('/playlistpage');
  }, []);


  return (
    <>
        <div className="container">
        <h1 className="heading">Redirecting to Pointers....</h1>
        
      </div>
    </>
  )
}
