import React, { useContext, useEffect } from "react";
import "../CSS/QuizPage.css";
import Timer from "./Timer";
import resourcesContext from "../Context/resourcesContext";
import quizSpinner from "../MediaResources/Quiz/QuizPage/quizLoading.gif";
import clockLogo from "../MediaResources/Quiz/QuizPage/clockLogo.png";
import quizPassLogo from "../MediaResources/Quiz/QuizPage/quizFinishTick.gif";
import quizFailLogo from "../MediaResources/Quiz/QuizPage/quizFailLogo.gif";
import tickLogo from '../MediaResources/Quiz/QuizPage/tickLogo.png';
import crossLogo from '../MediaResources/Quiz/QuizPage/crossLogo.png';
import { toast } from "react-toastify";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizPage(props) {
  // creating context using context api
  const { quizStarted, setQuizStart, userDetails,getResources } = useContext(resourcesContext);

  const navigate = useNavigate();
    

  const [userName, setUserName] = useState();

  // let selectedAnswers = new Array(props.quizModalDetails.noOfQuestions)

  const [selectedAnswers, setSelectedAnswer] = useState([]);

  const [quizFinish, setQuizFinish] = useState(false);

  const [quizTimer, setQuizTimer] = useState(0);

  const [score, setScore] = useState(
    new Array(props.quizModalDetails.noOfQuestions).fill(0)
  );
  let [finalScore, setFinalScore] = useState(0);

  var [questionIndex, setQuestionIndex] = useState(0);

  const time = new Date();

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



    setTime();
    setUserName(userDetails.name);


    quizFinish && (
      toast.success("Thank you for attempting the quiz", {
              toastId: "quizFinish",
              position: "top-right",
              autoClose: 3000,
              theme: "colored",
            })
    )


  }, [quizFinish]);

  // function to set the quiz timer based on the level and number of questions

  const setTime = () => {
    const time = new Date();

    if (props.quizModalDetails.proficiency === "Beginner") {
      setQuizTimer(props.quizModalDetails.noOfQuestions * 2);
    } else if (props.quizModalDetails.proficiency === "Modrate") {
      setQuizTimer(props.quizModalDetails.noOfQuestions * 1.5);
    } else if (props.quizModalDetails.proficiency === "Expert") {
      setQuizTimer(props.quizModalDetails.noOfQuestions * 1);
    } else if (props.quizModalDetails.proficiency === "Professional") {
      setQuizTimer(props.quizModalDetails.noOfQuestions * 0.5);
    }
  };

  // this function is for selection of answers
  const selectAnswer = (option, right_Answer, index) => {
    const newScore = [...score];
    newScore[index] = option === right_Answer ? 1 : 0;
    setScore(newScore);

    console.log("option : " + option);
    // selectedAnswers[index] = option;

    // this code is for storing the option value into selected answers array
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = option;
    setSelectedAnswer(newSelectedAnswers);

    if (questionIndex < props.quizModalDetails.noOfQuestions - 1) {
      nextQuestion();
    }
  };

  // this function is mapped with the next button present in the quiz card
  const nextQuestion = async () => {
    let temp = questionIndex + 1;

    if (questionIndex <= props.quizModalDetails.noOfQuestions - 1) {
      setQuestionIndex(temp);
    }
  };

  // this function is mapped with the previous button present in the quiz card

  const previousQuestion = async () => {
    let temp = questionIndex - 1;
    if (questionIndex !== 0) {
      setQuestionIndex(temp);
    }
  };

  //for submitting the answers
  const submitAnswers = () => {
    score.map((Element) => {
      if (Element === 1) {
        setFinalScore(++finalScore);
      }
    });

    console.log("Final Score : " + finalScore);
    console.log(selectedAnswers);

    setQuizFinish(true);
  };

  // this function is mapped for starting quiz button in start quiz screen
  const startQuiz = () => {
    setQuizStart(true);
    console.log(quizStarted);
  };

  // this function is for retaking the quiz 
  const retakeQuiz = ()=>{
    setQuizStart(false);
    setQuizFinish(false);
    setQuestionIndex(0);
    setFinalScore(0);
    setSelectedAnswer([]);

  }

  return (
    <>
      {/* this code is used for start quiz screen   */}

      {!quizStarted && (
        <div className="startQuizContainer container">
          <div class="card text-center mt-4">
            <div class="card-header">Welcome to the {props.quizTopic} Quiz</div>
            <div class="card-body">
              <h5 class="card-title">
                Level : {props.quizModalDetails.proficiency}
              </h5>
              <p class="card-text">
                You have got {quizTimer} minutes for{" "}
                {props.quizModalDetails.noOfQuestions} questions
              </p>
              <button class="btn btn-success" onClick={startQuiz}>
                Start Quiz
              </button>
            </div>
            <div class="card-footer text-body-secondary">Best of luck</div>
          </div>
        </div>
      )}

      {/* this code gets trigger when there is no data   */}
      {quizStarted && !props.output && (
        <div className="text-center carLoading">
          <img src={quizSpinner} alt="Loading..." />
          <h2>Loading...</h2>
        </div>
      )}

      {!quizFinish &&
        quizStarted &&
        props.output &&
        props.output.length !== 0 &&
        questionIndex <= props.quizModalDetails.noOfQuestions - 1 && (
          <>
            {/* this code is for the quiz timer  */}
            <div className="timer d-flex justify-content-center">
              <img src={clockLogo} alt="clock.." />
              <div>Time Left : &nbsp;</div>

              <strong>
                <Timer
                  expiryTimestamp={time.setSeconds(
                    time.getSeconds() + 60 * quizTimer
                  )}
                  totalTime={60 * quizTimer}
                  setQuizFinish={setQuizFinish}
                />
              </strong>
            </div>

            <div className="quizPageContainer">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Question</h2>

                  <h5 className="card-text mb-3">
                    {questionIndex + 1}. {props.output[questionIndex].Question}
                  </h5>

                  <div className="card optionCard">
                    <div
                      className="card-body"
                      onClick={() =>
                        selectAnswer(
                          props.output[questionIndex].Options[0],
                          props.output[questionIndex].Act_Answer,
                          questionIndex
                        )
                      }
                    >
                      a. {props.output[questionIndex].Options[0]}
                    </div>
                  </div>
                  <div className="card optionCard">
                    <div
                      className="card-body"
                      onClick={() =>
                        selectAnswer(
                          props.output[questionIndex].Options[1],
                          props.output[questionIndex].Act_Answer,
                          questionIndex
                        )
                      }
                    >
                      b. {props.output[questionIndex].Options[1]}
                    </div>
                  </div>
                  <div className="card optionCard">
                    <div
                      className="card-body"
                      onClick={() =>
                        selectAnswer(
                          props.output[questionIndex].Options[2],
                          props.output[questionIndex].Act_Answer,
                          questionIndex
                        )
                      }
                    >
                      c. {props.output[questionIndex].Options[2]}
                    </div>
                  </div>
                  <div className="card optionCard">
                    <div
                      className="card-body"
                      onClick={() =>
                        selectAnswer(
                          props.output[questionIndex].Options[3],
                          props.output[questionIndex].Act_Answer,
                          questionIndex
                        )
                      }
                    >
                      d. {props.output[questionIndex].Options[3]}
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
                  {questionIndex ===
                    props.quizModalDetails.noOfQuestions - 1 && selectedAnswers[questionIndex] && (
                    <button
                      className="btn btn-success"
                      onClick={() => submitAnswers()}
                    >
                      Submit
                    </button>
                  )}
                  <button
                    className={`btn btn-success ${
                      questionIndex >= props.quizModalDetails.noOfQuestions - 1
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() => nextQuestion()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      {/* this code gets triggers after quiz completion */}
      {quizFinish && (
        <div className="quizFinishContainer container mt-3 text-center">
          <div class="card">
            <div class="card-body">
              {finalScore >= props.quizModalDetails.noOfQuestions * 0.3 && (
                <>
                  <img src={quizPassLogo} className="mb-3" />
                  <h3>Congratulations {userName} you have passed the quiz</h3>
                </>
              )}

              {finalScore < props.quizModalDetails.noOfQuestions * 0.3 && (
                <>
                  <img src={quizFailLogo} className="mb-3" />
                  <h3>Unfortunately {userName} you have failed the quiz</h3>
                </>
              )}

              {/* score  */}
              <h4>
                You marked {finalScore}/{props.quizModalDetails.noOfQuestions}{" "}
                questions correct
              </h4>

              <div className="buttons">
                <button className="btn" onClick={retakeQuiz}>Retake Quiz</button>
                <button
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#reviewAnswers"
                >
                  Review Answers
                </button>

                <button className="btn" onClick={()=>navigate('/quiz')}>Back to Quiz page</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* this modal is for reviewing the answers  */}

      <div
        class="modal fade"
        id="reviewAnswers"
        tabindex="-1"
        aria-labelledby="reviewAnswersLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable  modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="reviewAnswersLabel">
                Your Answers
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* this code is for mapping the questions  */}

              {props.output && props.output.map((Element, index) => {
                return (
                  <div class="card reviewAnswerCard">
                    <div class="card-body">
                      <h3 className="card-title">Question{" : "}{index + 1}</h3>

                      <h5 className="card-text mb-3">
                        {props.output[index].Question}
                      </h5>

                      <div className={ props.output[index].Options[0] === props.output[index].Act_Answer ?  `card reviewOptionCard rightAnswer`: 'card reviewOptionCard wrongAnswer'}>
                        <div
                          className="card-body"
                          
                        >
                          a. {props.output[index].Options[0]}
                        </div>
                      </div>
                      <div className={ props.output[index].Options[1] === props.output[index].Act_Answer ?  `card reviewOptionCard rightAnswer`: 'card reviewOptionCard wrongAnswer'}>
                        <div
                          className="card-body"
                          
                        >
                          b. {props.output[index].Options[1]}
                        </div>
                      </div>
                      <div className={ props.output[index].Options[2] === props.output[index].Act_Answer ?  `card reviewOptionCard rightAnswer`: 'card reviewOptionCard wrongAnswer'}>
                        <div
                          className="card-body"
                          
                        >
                          c. {props.output[index].Options[2]}
                        </div>
                      </div>
                      <div className={ props.output[index].Options[3] === props.output[index].Act_Answer ?  `card reviewOptionCard rightAnswer`: 'card reviewOptionCard wrongAnswer'}>
                        <div
                          className="card-body"
                          
                        >
                          d. {props.output[index].Options[3]}
                        </div>
                      </div>
                      <p className="yourSelection">
                        <strong>Your Selection : &nbsp;</strong>
                        
                        <span className={props.output[index].Act_Answer === selectedAnswers[index] ? 'rightSelection' : 'wrongSelection'}>{selectedAnswers[index]} </span>
                        
                        <img src={props.output[index].Act_Answer === selectedAnswers[index] ? tickLogo : crossLogo}/>
                    </p>
                      
                    </div>

                   
                  </div>
                );
              })}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
