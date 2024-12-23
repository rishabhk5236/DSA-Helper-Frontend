import React from 'react';
import { useState } from 'react';
import ResourcesContext from '../Context/resourcesContext.js';
import { useSubmit } from 'react-router-dom';

export default function ResourcesState(props) {
  const [playlist, setPlaylist] = useState([]);
  const [animatedVideos, SetAnimatedVideos] = useState([]);
  const [oneShotVideos, setOneShotVideos] = useState([]);
  const [notes,setNotes]=useState([]);
  const [jobs,setJobs]=useState([]);
  const [quizStarted,setQuizStarted]=useState(false);

  const [userDetails,setUserDetails]=useState({name:"",email:"",date:"",id:"",mobile:"",dateOfBirth:""});
  const [adminDetails,setAdminDetails]=useState({name:"",email:"",date:"",id:"",mobile:"",dateOfBirth:""});
  
  const host="https://dsa-helper-backend.onrender.com";

  const setQuizStart = (value)=>{
    setQuizStarted(value);
  }

  const getUserDetails =async ()=>{
    const response=await fetch(`${host}/api/auth/getuser`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('auth-token')
      }
    });

    const json=await response.json();

    setUserDetails({name:json.name,email:json.email,date:json.date,id:json._id,mobile:json.mobile,dateOfBirth:json.dateOfBirth});
    
  }

  // this code is for getting admin details 

  const getAdminDetails=async ()=>{
    const response=await fetch(`${host}/api/adminAuth/getadmin`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "adminAuthToken":localStorage.getItem('adminAuthToken')
      }
    });

    const json=await response.json();

    setAdminDetails({name:json.name,email:json.email,date:json.date,id:json._id,mobile:json.mobile,dateOfBirth:json.dateOfBirth});
    
  }


    // this is for playlists animatedVideos oneshotVideos 

    const getResources = async () => {
    // this code is for fetching playlist
    const Playlistresponse = await fetch(`${host}/api/playlist/fetchplaylists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const Playlistjson = await Playlistresponse.json();
    setPlaylist(Playlistjson);

    // this code is for fetching animated videos
    const AnimatedVideosresponse = await fetch(
      `${host}/api/animatedvideo/fetchanimatedvideo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const AnimatedVideosjson = await AnimatedVideosresponse.json();
    SetAnimatedVideos(AnimatedVideosjson);

    // this code is for fetching oneshotVideos
    const onseShotVideoresponse = await fetch(
      `${host}/api/oneshotvideo/fetchoneshotvideos`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const onseShotVideojson = await onseShotVideoresponse.json();
    setOneShotVideos(onseShotVideojson);

  };


  // this code is for getting the jobs 

  const getJobs=async()=>{
    const jobsresponse=await fetch(`${host}/api/jobs/fetchJobs`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      },
    });

    const jobsjson=await jobsresponse.json();

    setJobs(jobsjson.reverse());
  }


  // this code is for fetching the notes 
  const getNotes=async ()=>{
      const notesResponse=await fetch(`${host}/api/notes/fetchNotes`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
        },
      });

      const notesJson=await notesResponse.json();
      setNotes(notesJson);
  }
 


  
  return (
    <div>
      <ResourcesContext.Provider value={{host,userDetails,getUserDetails,adminDetails,getAdminDetails,playlist,oneShotVideos,animatedVideos,getResources,notes,getNotes,getJobs,jobs , quizStarted, setQuizStart}}>
        {props.children}
      </ResourcesContext.Provider>
    </div>
  )
}
