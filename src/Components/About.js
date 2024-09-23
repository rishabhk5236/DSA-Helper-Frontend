import React from 'react'
import AboutPng from '../MediaResources/Footer/AboutPng.png';

export default function About() {
  return (
    <div className="container my-3">
        <h1 className="text-center">About us</h1>
        
        <div class="card aboutCard mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src={AboutPng} class="img-fluid rounded-start aboutCardImg" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title">DSA Helper</h3>
        <p class="card-text">This is an education portal having following features ,Here you can- </p>
        <p class="card-text">1. Login/Signup</p>
        <p class="card-text">2. Access Courses</p>
        <p class="card-text">3. Access Notes</p>
        <p class="card-text">4. Access Jobs</p>
        <p class="card-text">5. Access Quetion Papers</p>
        <p class="card-text"><small class="text-body-secondary">One Solution for all your Tech Related Problems</small></p>
        <p class="card-text my-0"><strong class="text-body-secondary">Developed By : Rishabh Kanaujiya & Seema Sachan</strong></p>
        <p class="card-text my-0"><strong class="text-body-secondary">rishabhk5236@gmail.com & seemasachan14@gmail.com</strong></p>
        <a class="card-text my-0" href="https://www.linkedin.com/in/rishabh-kanaujiya-49643a222/" target='_blank'><strong class="text-body-secondary" >Linked In(Rishabh)</strong></a>
        <a class="card-text my-0" href="https://www.linkedin.com/in/seema-sachan-303b21231/" target='_blank'><strong class="text-body-secondary" >  Linked In(Seema)</strong></a>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
