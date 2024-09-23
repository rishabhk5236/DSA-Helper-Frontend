import React from "react";
import "../CSS/Footer.css";
import instaLogo from "../MediaResources/Footer/instagramLogo.png";
import twitterLogo from "../MediaResources/Footer/twitterLogo.png";
import linkedinLogo from "../MediaResources/Footer/linkedinLogo.png";
import {Link} from 'react-router-dom';

export default function Footer(props) {
  return (
    <>
          <h3 className=" greet text-center mt-0">!! Thank You for Visiting !!</h3>
          <section className="main">
        <footer className="footer text-white">
          <div className="container p-4">
            <div className="row">
              <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                <h3 className="text-uppercase WebHeading">DSA Helper</h3>

                <p className="footer-text">
                  You can Learn, Practice so many complex concepts of Coding and
                  programming with the help of animations and videos here
                  completely free.
                </p>
              </div>

              {(localStorage.getItem('auth-token') || localStorage.getItem('adminAuthToken')) && <div className=" learn col-md-3 col-md-6">
                <h5 className="text-uppercase">Learn</h5>

                <ul className="list-unstyled mb-0" onClick={()=>props.setProgress(100)}>
                  <li>
                    <Link to="/data-structures">
                      Data Structures
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Searching
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Sorting
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Competitive Coding
                    </Link>
                  </li>
                </ul>
              </div>}

              {(localStorage.getItem('auth-token') || localStorage.getItem('adminAuthToken')) && <div className="about col-md-3 col-md-6">
                <h5 className=" text-uppercase">About</h5>

                <ul className="list-unstyled">
                  <li>
                    <Link to="/about">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Company Overview
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Privacy Term
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Help
                    </Link>
                  </li>
                </ul>
              </div>}

              <div className="contact col-md-3 col-md-6">
                <h5 className=" text-uppercase">Contact</h5>

                <ul className="list-unstyled  mb-0">
                  <li className="footerContactEmail">helpdsahelper@gmail.com</li>
                  <li>
                    <a href="https://www.instagram.com/_rishabh__2.0/" target="_blank">
                      <img src={instaLogo} alt=".."/>Instagram
                    </a>
                  </li>
                  <li>
                    <a href="/"target="_blank" >
                      <img src={twitterLogo} alt=".."/>Twitter
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/seema-sachan-303b21231/" target="_blank">
                      <img src={linkedinLogo} alt=".."/>Linkedin
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="copyrightHeading text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2023 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">
              www.dsahelper.com
            </a>
          </div>

        </footer>
      </section>
    </>
  );
}