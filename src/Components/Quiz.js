import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Quiz.css";
import spinner from "../MediaResources/Quiz/Spinner.gif";
import SkillSelection from "./SkillSelection";
import {  toast } from "react-toastify";
import QuizPage from "./QuizPage";


export default function Quiz(props) {
  const API_KEY = "AIzaSyBdTxoCOu2KI4EsTi5XHlVdL-AAi_rlu8o";
  const navigate=useNavigate();
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [output, setOutput] = useState([]);

  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(new Array(10).fill(0));
  const [quizTopic,setQuizTopic]=useState("");

  const [quizModalDetails, setQuizModalDetails] = useState({
    proficiency: "",
    noOfQuestions: "",
  });

  const modalOnChange = (e) => {
    setQuizModalDetails({
      ...quizModalDetails,
      [e.target.name]: e.target.value,
    });
  };

  let finalScore = 0;

  var [questionIndex, setQuestionIndex] = useState(0);

  // for fetching the raw data
  const query = async () => {

    if(quizModalDetails.noOfQuestions>100){
      await  toast.error("No of Questions can not exceed 100 ", {
        toastId: "noOfQuestions",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })

      return;
    }

    if(quizModalDetails.proficiency=="" || quizModalDetails.proficiency==""){
      return;
    }
    

    
    
    setLoading(true);
    props.setProgress(10);
    const prompt = `List array of ${quizModalDetails.noOfQuestions} ${quizModalDetails.proficiency} level questions along with their answers realted to ${quizTopic} based on the given JSON Schema and do not include any other word or symbol except the json object array
    {"Question":"Questions will come here",
    "Options": ["Option 1 will come here","Option 2 will come here","Option 3 will come here","Option 4 will come here"],
    "Act_Answer":"Right Answer Will come here"}`;

    try {
      const result = await model.generateContent(prompt);
      props.setProgress(50);
      const response = await result.response;
      const text = await response.text();
      props.setProgress(80);
      const data = await JSON.parse(text);
      await setOutput(data);
    } catch {
      query();
    }

    setLoading(false);
    await navigate('/quizPage');
    props.setProgress(100);
  };

  const selectAnswer = (option, right_Answer, index) => {
    const newScore = [...score];
    newScore[index] = option === right_Answer ? 1 : 0;
    setScore(newScore);

    if (questionIndex < quizModalDetails.noOfQuestions-1) {
      nextQuestion();
    }
  };

  const nextQuestion = async () => {
    let temp = (await questionIndex) + 1;

    if (questionIndex <= quizModalDetails.noOfQuestions-1) {
      setQuestionIndex(temp);
    }
  };

  const submitAnswers = () => {
    score.map((Element) => {
      if (Element === 1) {
        finalScore++;
      }
    });

    console.log(score);

    console.log("Your Score is : ", finalScore);
  };

  const previousQuestion = async () => {
    let temp = (await questionIndex) - 1;
    if (questionIndex !== 0) {
      setQuestionIndex(temp);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="container">
      <SkillSelection setQuizTopic={setQuizTopic} />
      {false && <QuizPage data={output} quizModalDetails={quizModalDetails}/>}
      <div className="spinner text-center">
        {loading && <img className="" src={spinner} alt=".." />}
      </div>

      {!loading && output.length !== 0 && questionIndex <= quizModalDetails.noOfQuestions-1 && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Question</h2>

            <h5 className="card-text mb-3">
              {questionIndex + 1}. {output[questionIndex].Question}
            </h5>

            <div className="card optionCard">
              <div
                className="card-body"
                onClick={() =>
                  selectAnswer(
                    output[questionIndex].Options[0],
                    output[questionIndex].Act_Answer,
                    questionIndex
                  )
                }
              >
                a. {output[questionIndex].Options[0]}
              </div>
            </div>
            <div className="card optionCard">
              <div
                className="card-body"
                onClick={() =>
                  selectAnswer(
                    output[questionIndex].Options[1],
                    output[questionIndex].Act_Answer,
                    questionIndex
                  )
                }
              >
                b. {output[questionIndex].Options[1]}
              </div>
            </div>
            <div className="card optionCard">
              <div
                className="card-body"
                onClick={() =>
                  selectAnswer(
                    output[questionIndex].Options[2],
                    output[questionIndex].Act_Answer,
                    questionIndex
                  )
                }
              >
                c. {output[questionIndex].Options[2]}
              </div>
            </div>
            <div className="card optionCard">
              <div
                className="card-body"
                onClick={() =>
                  selectAnswer(
                    output[questionIndex].Options[3],
                    output[questionIndex].Act_Answer,
                    questionIndex
                  )
                }
              >
                d. {output[questionIndex].Options[3]}
              </div>
            </div>
          </div>

          <div className="buttons">
            <button
              className={`btn btn-danger ${
                questionIndex <= 0 ? "disabled" : ""
              }`}
              onClick={() => previousQuestion()}
            >
              Previous
            </button>
            {questionIndex === quizModalDetails.noOfQuestions-1 && (
              <button className="btn btn-info" onClick={() => submitAnswers()}>
                Submit
              </button>
            )}
            <button
              className={`btn btn-success ${
                questionIndex >= quizModalDetails.noOfQuestions-1 ? "disabled" : ""
              }`}
              onClick={() => nextQuestion()}
            >
              Next
            </button>
          </div>
        </div>
      )}

      

      <div
        class="modal fade"
        id="skillSelectionModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Kindly Fill these details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* this code is for the body of the modal  */}

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Proficiency
                </label>
                <select
                  type="select"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="proficiency"
                  value={quizModalDetails.proficiency}
                  onChange={modalOnChange}
                >
                  <option default value="begineer" name="begineer">
                    Beginner
                  </option>
                  <option value="modrate" name="modrate">
                    Modrate
                  </option>
                  <option value="expert" name="expert">
                    Expert
                  </option>
                  <option value="professional" name="professional">
                    Professional
                  </option>
                </select>

                <label for="noOfQuestions">No of questions</label>
                <input
                  type="text"
                  class="form-control"
                  id="noOfQuestions"
                  value={quizModalDetails.noOfQuestions}
                  placeholder="Kindly fill the number of questions"
                  name="noOfQuestions"
                  onChange={modalOnChange}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{query()}}>
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
