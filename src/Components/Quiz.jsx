import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Quiz.css";
import SkillSelection from "./SkillSelection";
import { toast } from "react-toastify";
import resourcesContext from "../Context/resourcesContext";
import loginLoader from "../MediaResources/LoginSignup/LoginLoader.gif";
import { GoogleGenerativeAI } from "@google/generative-ai";


export default function Quiz(props) {
  const { setQuizStart, getResources } = useContext(resourcesContext);

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI(API_KEY);
  const freeModels = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
    "gemini-1.0-pro"
  ];

  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(new Array(10).fill(0));
  const [quizTopic, setQuizTopic] = useState("");
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizDelay, setQuizDelay] = useState(false);

  // ✅ delay handler (no memory leak)
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuizDelay(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const modalOnChange = (e) => {
    props.setQuizModalDetails({
      ...props.quizModalDetails,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ FIXED QUERY FUNCTION
  const query = async (retry = 0) => {
    const MAX_RETRIES = 3;


    if (!API_KEY) {
      console.error("API key missing : "+API_KEY);
    }
    setQuizLoading(true);

    // validations
    if (props.quizModalDetails.noOfQuestions > 100) {
      toast.error("No of Questions cannot exceed 100");
      setQuizLoading(false);
      return;
    }

    if (props.quizModalDetails.noOfQuestions < 10) {
      toast.error("No of Questions cannot be less than 10");
      setQuizLoading(false);
      return;
    }

    if (
      props.quizModalDetails.proficiency === "" ||
      props.quizModalDetails.noOfQuestions === ""
    ) {
      setQuizLoading(false);
      return;
    }

    props.setQuizTopic(quizTopic);

    setLoading(true);
    props.setProgress(10);

    const prompt = `List an array of ${props.quizModalDetails.noOfQuestions} ${props.quizModalDetails.proficiency} questions along with their answers realted to ${quizTopic} based on the given JSON Schema  
    Questions = {"Question":"Questions will come here",
    "Options": ["Option 1 will come here","Option 2 will come here","Option 3 will come here","Option 4 will come here"],
    "Act_Answer":"Right Answer Will come here"}
    
    return list[Questions] and make sure that the questions that are fetched on last 3 quizes will not repeat again
    
    
    
    
    `;

    let success = false;
    let data;

    for (const modelName of freeModels) {
      try {
        console.log(`Attempting generation with model: ${modelName}`);
        const currentModel = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { responseMimeType: "application/json" },
        });

        const result = await currentModel.generateContent(prompt);
        const text = result.response.text();

        console.log(text);

        // ✅ safe JSON parsing
        data = JSON.parse(text);

        if (data && Array.isArray(data)) {
          success = true;
          break; // Exit loop on success
        }
      } catch (error) {
        console.error(`Error with model ${modelName}:`, error);
        // Fallback to the next model in the list
      }
    }

    if (success) {
      props.setOutput(data);
      console.log(data);

      navigate("/quizPage");
      props.setProgress(100);
    } else {
      if (retry < MAX_RETRIES) {
        console.log(`Retrying... Attempt ${retry + 1}`);
        return query(retry + 1);
      } else {
        toast.error("Failed to generate quiz after multiple attempts. Please try again later.");
      }
    }

    setQuizLoading(false);
    setLoading(false);
  };

  useEffect(() => {
      window.scrollTo(0, 0);
      getResources();

    setLoading(false);
    setQuizTopic("");

    const tempArray = new Array(
      props.quizModalDetails.noOfQuestions || 10
    ).fill(0);
    setScore(tempArray);

    setQuizStart(false);
  }, []);

  return (
    <div className="container">
      <SkillSelection setQuizTopic={setQuizTopic} />

      {/* Loader */}
      {quizLoading && (
        <div className="quizLoader">
          <img src={loginLoader} alt="Quiz Loading" />
          {!quizDelay && <p>Loading Quiz....</p>}
          {quizDelay && <p>Loading Quiz... It may take a while...</p>}
        </div>
      )}

      {/* Modal */}
      <div
        className="modal fade"
        id="skillSelectionModal"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                Kindly Fill these details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <label className="form-label">Proficiency</label>
              <select
                className="form-control"
                name="proficiency"
                value={props.quizModalDetails.proficiency}
                onChange={modalOnChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Moderate">Moderate</option>
                <option value="Expert">Expert</option>
                <option value="Professional">Professional</option>
              </select>

              <label>No of questions</label>
              <input
                type="number"
                className="form-control"
                value={props.quizModalDetails.noOfQuestions}
                name="noOfQuestions"
                onChange={modalOnChange}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>

              <button
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={query}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}