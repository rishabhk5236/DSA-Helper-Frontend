import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Algorithm(props) {
  
  // this is my channel's algorithm playlist id 
  const playlistId = "PLHJ19n5Es9XCzcQpAVlQt9BQsYC4aHQTQ";

  
  const navigate = useNavigate();

  useEffect(() => {
        // this code executes when the component mount 
        props.setplaylistid(playlistId);
        navigate('/playlistpage');

      window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="heading">Redirecting to Algorithms...</h1>
        
      </div>
    </>
  );
}
