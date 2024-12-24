import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Quiz.css";
import spinner from "../MediaResources/Quiz/Spinner.gif";
import SkillSelection from "./SkillSelection";
import {  toast } from "react-toastify";
import QuizPage from "./QuizPage";
import { Output } from "@mui/icons-material";
import resourcesContext from "../Context/resourcesContext";



export default function Quiz(props) {

  const {setQuizStart,getResources} = useContext(resourcesContext);

  const API_KEY = "AIzaSyBdTxoCOu2KI4EsTi5XHlVdL-AAi_rlu8o";
  const navigate=useNavigate();
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",generationConfig:{responseMimeType:"application/json"} });


  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(new Array(10).fill(0));
  const [quizTopic,setQuizTopic]=useState("");

  const [quizLoading,setQuizLoading] = useState(false);
  const [quizDelay,setQuizDelay] = useState(false);

  

  const modalOnChange = (e) => {
    props.setQuizModalDetails({
      ...props.quizModalDetails,
      [e.target.name]: e.target.value,
    });
  };


  // for fetching the raw data
  const query = async () => {


    setQuizLoading(true);

    // setting login delay 
    setTimeout(function() {
      setQuizDelay(true);
    }, 10000);



    if(props.quizModalDetails.noOfQuestions>100){
      toast.error("No of Questions can not exceed 100 ", {
        toastId: "noOfQuestions",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })

      return;
    }

    if(props.quizModalDetails.noOfQuestions <10){
      toast.error("No of Questions can not be less than 10 ", {
        toastId: "noOfQuestions",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })

      return;
    }

    if(props.quizModalDetails.proficiency=="" || props.quizModalDetails.noOfQuestions==""){
      return;
    }
    
    props.setQuizTopic(quizTopic);
    
    
   
    
    
    
    setLoading(true);
    props.setProgress(10);
    
    
    const prompt = `List an array of ${props.quizModalDetails.noOfQuestions} ${props.quizModalDetails.proficiency} questions along with their answers realted to ${quizTopic} based on the given JSON Schema 
    Questions = {"Question":"Questions will come here",
    "Options": ["Option 1 will come here","Option 2 will come here","Option 3 will come here","Option 4 will come here"],
    "Act_Answer":"Right Answer Will come here"}
    
    return list[Questions]
    
    
    
    
    `;
    
  
    
    try {
      const result = await model.generateContent(prompt);
    const text = await result.response.text();
    
    
    
    const data = await JSON.parse(text);
    
    

    if(!data.Questions){
      query();
    }
    
    props.setOutput(data.Questions);
    
  

  } catch {
    query();
  }
  
  
  navigate('/quizPage');
  props.setProgress(100);
  setLoading(false);
  };

  


  
  
 
  useEffect(() => {



    // validating that the user is logged in
    
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


    setLoading(false);
    setQuizTopic("");
    const tempArray = new Array(props.quizModalDetails.noOfQuestions).fill(0);
    setScore(tempArray);
    setQuizStart(false);
  }, []);
  
  return (
    <div className="container">
      <SkillSelection setQuizTopic={setQuizTopic} />
     
        
      {/* this code is for handling the loader of quizpage  */}
      {quizLoading && <div className="quizLoader">
        <img src={loginLoader} alt="Quiz Loading"/>
        
        {!quizDelay && <p>Loading Quiz....</p>}
        {quizDelay && <p>Loading Quiz... It may take a while...</p>}


      </div>}
      

      <div
        className="modal fade"
        id="skillSelectionModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Kindly Fill these details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* this code is for the body of the modal  */}

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Proficiency
                </label>
                <select
                  type="select"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="proficiency"
                  value={props.quizModalDetails.proficiency}
                  onChange={modalOnChange}
                >
                  <option default value="Begineer" name="begineer">
                    Beginner
                  </option>
                  <option value="Modrate" name="modrate">
                    Modrate
                  </option>
                  <option value="Expert" name="expert">
                    Expert
                  </option>
                  <option value="Professional" name="professional">
                    Professional
                  </option>
                </select>

                <label htmlFor="noOfQuestions">No of questions</label>
                <input
                  type="text"
                  className="form-control"
                  id="noOfQuestions"
                  value={props.quizModalDetails.noOfQuestions}
                  placeholder="Kindly fill the number of questions"
                  name="noOfQuestions"
                  onChange={modalOnChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={()=>{query()}}>
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
