import React, { useState } from 'react'
import AnimatedVideo from './AnimatedVideo'
import OneShotVideos from './OneShotVideos'
import Playlists from './Playlists'
import QuestionPapers from '../QuetionPapers'
import '../../CSS/AdminPlaylistVideoResources.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../CSS/Resources.css'


export default function Resources(props) {

  const [pageState,setPageState]=useState('videos');

  const navigate=useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('adminAuthToken')){
      navigate('/');
    }
  },[]);


  return (
    <div className='container '>

      <div className="resourceNavigateCapsules d-flex">
        <button className="btn btn-success " onClick={()=>setPageState('videos')}>Videos</button>
        <button className="btn btn-success " onClick={()=>setPageState('notes')}>Notes</button>
      </div>
      {pageState==='videos' && <div className="container mainContainerOfAllResources">
      <Playlists base_url={props.base_url}/>
      <OneShotVideos base_url={props.base_url}/>
      <AnimatedVideo base_url={props.base_url}/>

      </div>}

      {pageState==='notes' && <div className="container">

        <QuestionPapers/>
      </div>}
    </div>
  )
}
