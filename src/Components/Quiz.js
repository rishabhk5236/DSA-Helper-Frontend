import React, { useEffect, useState } from "react";
import '../CSS/Quiz.css';
import spinner from '../MediaResources/Quiz/Spinner.gif';

export default function Quiz(props) {
  const API_KEY = "AIzaSyBdTxoCOu2KI4EsTi5XHlVdL-AAi_rlu8o";
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [output, setOutput] = useState([]);

  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(new Array(10).fill(0));



  let finalScore = 0;

  const Quiz_Level = "Proficient";
  const Quiz_Topic = "Java";
  var [questionIndex, setQuestionIndex] = useState(0);


// for fetching the raw data 
  const query = async () => {
    setLoading(true);
    props.setProgress(10);
    const prompt = `List array of 10 ${Quiz_Level}question along with their answers realted to ${Quiz_Topic} based on the given JSON Schema and do not include any other word or symbol except the json object array
    {"Question":"Questions will come here",
    "Options": ["Option 1 will come here","Option 2 will come here","Option 3 will come here","Option 4 will come here"],
    "Act_Answer":"Right Answer Will come here"}`;
    
    
    const result = await model.generateContent(prompt);
    props.setProgress(50);
    const response = await result.response;
    const text = await response.text();
    props.setProgress(80);
    const data = await JSON.parse(text);
    
    console.log(data);
    
    await setOutput(data);
    setLoading(false);
    props.setProgress(100);
  };



  const selectAnswer = (option, right_Answer, index) => {
    const newScore = [...score];
    newScore[index] = option === right_Answer ? 1 : 0;
    setScore(newScore);

    if (questionIndex < 9) {
      nextQuestion();
    } 
  };

  const nextQuestion = async ()=>{
    let temp= await questionIndex+1;

    if(questionIndex<=9){
      setQuestionIndex(temp);
    }

  }

  const submitAnswers = () =>{
    score.map((Element)=>{
      if (Element===1){
        finalScore++;
      }
    })

      console.log(score);
      
      console.log("Your Score is : ",finalScore);
  }

  const previousQuestion = async ()=>{
    let temp = await questionIndex-1;
    if(questionIndex!==0){
      setQuestionIndex(temp);
    }
  }
  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="spinner text-center">
        {loading&& <img className="" src={spinner} alt=".." />}
        {!loading && <button className="btn btn-primary" onClick={query}>
        click
      </button>}
      </div>
      
      {(output.length!==0 && questionIndex<=9) && <div className="card">
        <div className="card-body">
          <h2 className="card-title">Question</h2>

          <h5 className="card-text mb-3">
            {questionIndex + 1}. {output[questionIndex].Question}
          </h5>

          <div className="card optionCard">
            <div className="card-body" onClick={()=>selectAnswer(output[questionIndex].Options[0],output[questionIndex].Act_Answer,questionIndex)}>a. {output[questionIndex].Options[0]}</div>
          </div>
          <div className="card optionCard">
            <div className="card-body" onClick={()=>selectAnswer(output[questionIndex].Options[1],output[questionIndex].Act_Answer,questionIndex)}>b. {output[questionIndex].Options[1]}</div>
          </div>
          <div className="card optionCard">
            <div className="card-body" onClick={()=>selectAnswer(output[questionIndex].Options[2],output[questionIndex].Act_Answer,questionIndex)}>c. {output[questionIndex].Options[2]}</div>
          </div>
          <div className="card optionCard">
            <div className="card-body" onClick={()=>selectAnswer(output[questionIndex].Options[3],output[questionIndex].Act_Answer,questionIndex)}>d. {output[questionIndex].Options[3]}</div>
          </div>
           
        </div>


        <div className="buttons">
          <button className={`btn btn-danger ${questionIndex<=0?'disabled':''}`} onClick={()=>previousQuestion()}>Previous</button>
          {questionIndex===9 && <button className="btn btn-info" onClick={()=>submitAnswers()}>Submit</button>}
          <button className={`btn btn-success ${questionIndex>=9?'disabled':''}`} onClick={()=>nextQuestion() }>Next</button>
        </div>
      </div>}

    
    </div>
  );
}
