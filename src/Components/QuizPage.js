import React, { useEffect } from "react";
import { useState } from "react";

export default function QuizPage(props) {

  const [output,setOutput]=useState([]);
  const [quizModalDetails,setQuizModalDetails] = useState({});



  useEffect(()=>{
    quizModalDetails=props.quizModalDetails;
    output=props.output;
  },[])
  
  const [score, setScore] = useState(new Array(10).fill(0));
  let finalScore = 0;

  var [questionIndex, setQuestionIndex] = useState(0);

  const selectAnswer = (option, right_Answer, index) => {
    const newScore = [...score];
    newScore[index] = option === right_Answer ? 1 : 0;
    setScore(newScore);

    if (questionIndex < quizModalDetails.noOfQuestions - 1) {
      nextQuestion();
    }
  };

  const nextQuestion = async () => {
    let temp = (await questionIndex) + 1;

    if (questionIndex <= quizModalDetails.noOfQuestions - 1) {
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

  return;
  <>
  
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
  </>;
}
