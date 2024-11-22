import "./App.css";
import DataStructures from "./Components/DataStructures";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Learn from "./Components/Learn";
import LearnPlaylistPage from "./Components/LearnPlaylistPage";
import { useState } from "react";
import LearnVideoPage from "./Components/LearnVideoPage";
import LoadingBar from "react-top-loading-bar";
import Home from "./Components/Home";
import LoginSignup from "./Components/LoginSignup";
import Alert from "./Components/Alert";
import ResourcesState from "./Context/ResourcesState";
import Resources from "./Components/Resources/Resources";
import QuestionPapers from './Components/QuetionPapers'
import {  ToastContainer } from "react-toastify";
import AdminLoginPage from "./Components/AdminLoginPage";
import Algorithm from "./Components/Algorithm";
import Pointers from "./Components/Pointers";
import Jobs from "./Components/Jobs";
import About from "./Components/About";
import Quiz from "./Components/Quiz";
import QuizPage from "./Components/QuizPage";

function App() {


  // this is the base url for hitting apis 
  //change this url also in resourceState File
  const base_url='https://dsa-helper-backend.onrender.com';

  const [playlistid, setplaylistid] = useState("");
  const [videoid, setvideoid] = useState("");
  const [progress, setProgress] = useState(0);
  const [alert,setAlert]=useState(null);


  // this code is for shoing alert 
  
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }



  const SessionTimeOutLogoutUser=()=>{
    if(localStorage.getItem('auth-token')){
  
        localStorage.removeItem('auth-token');
        showAlert(`You are automatically logged out because of being inactive for ${timeoutId}`,"danger");
        window.location.reload();
            
      }
    if(localStorage.getItem('adminAuthToken')){
  
        localStorage.removeItem('adminAuthToken');
        showAlert(`You are automatically logged out because of being inactive for ${timeoutId}`,"danger");
        window.location.reload();
            
      }
  }


let timeoutId;

function handleVisibilityChange() {
  if (document.hidden) {
    timeoutId = setTimeout(SessionTimeOutLogoutUser, 1800000);//here 1800000 means 30 minutes
  } else {
    clearTimeout(timeoutId);
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange, false);

 





  return (
    <>
      <ResourcesState>
        <Router>
          <LoadingBar
            height={4}
            color="#abcfa5"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Navbar setProgress={setProgress} base_url={base_url}/>
          <Alert alert={alert}/>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home setProgress={setProgress}  showAlert={showAlert} base_url={base_url}/>}
            />
            <Route
              exact
              path="/data-structures"
              element={<DataStructures setplaylistid={setplaylistid} setProgress={setProgress}  showAlert={showAlert} base_url={base_url}/>}
            />
            <Route
              exact
              path="/algorithms"
              element={<Algorithm setplaylistid={setplaylistid} setProgress={setProgress}  showAlert={showAlert} base_url={base_url}/>}
            />
            <Route
              exact
              path="/pointers"
              element={<Pointers setplaylistid={setplaylistid} setProgress={setProgress}  showAlert={showAlert} base_url={base_url}/>}
            />
            <Route
              exact
              path="/jobs"
              element={<Jobs setplaylistid={setplaylistid} setProgress={setProgress}  showAlert={showAlert} base_url={base_url}/>}
            />
            <Route
              exact
              path="/learn"
              element={
                <Learn
                  setplaylistid={setplaylistid}
                  setvideoid={setvideoid}
                  setProgress={setProgress} showAlert={showAlert}
                  base_url={base_url}
                />
              }
            />
            <Route
              exact
              path="/playlistpage"
              element={
                <LearnPlaylistPage
                  key={playlistid}
                  playlistid={playlistid}
                  setProgress={setProgress} showAlert={showAlert}
                  base_url={base_url}
                />
              }
            />
            <Route
              exact
              path="/oneshotvideospage"
              element={
                <LearnVideoPage videoId={videoid} setProgress={setProgress} showAlert={showAlert} base_url={base_url} />
              }
            />
            <Route
              exact
              path="/login-signup"
              element={<LoginSignup setProgress={setProgress} base_url={base_url} />}
            />
            <Route
              exact
              path="/admin-login"
              element={<AdminLoginPage setProgress={setProgress} base_url={base_url} />}
            />
            <Route
              exact
              path="/resources"
              element={<Resources setProgress={setProgress} base_url={base_url} />}
            />
            <Route
              exact
              path="/question-papers-notes"
              element={<QuestionPapers setProgress={setProgress} base_url={base_url} />}
            />
            <Route
              exact
              path="/about"
              element={<About setProgress={setProgress} />}
            />
            <Route
              exact
              path="/quiz"
              element={<Quiz setProgress={setProgress} showAlert={showAlert}/>}
            />
            <Route
              exact
              path="/quizPage"
              element={<QuizPage setProgress={setProgress}/>}
            />
           
          </Routes>
          <Footer setProgress={setProgress} base_url={base_url} />
        </Router>

      </ResourcesState>

          
          

{/* this code is for toast  */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
