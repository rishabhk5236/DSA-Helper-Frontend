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

  const API_KEY = process.env.GEMINI_API_KEY;
  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

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

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      let data;
      console.log(text);

      // ✅ safe JSON parsing
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON from API");
      }

      if (!data || !Array.isArray(data)) {
        if (retry < MAX_RETRIES) {
          return query(retry + 1);
        } else {
          toast.error("Failed to generate quiz. Try again.");
          setQuizLoading(false);
          setLoading(false);
          return;
        }
      }

      props.setOutput(data);
      console.log(data);

      navigate("/quizPage");
      props.setProgress(100);
    } catch (error) {
      console.log(error);

      if (retry < MAX_RETRIES) {
        return query(retry + 1);
      } else {
        toast.error("Quiz generation limit exceeds, please wait for some time");
      }
    }

    setQuizLoading(false);
    setLoading(false);
  };

  useEffect(() => {
    if (
      localStorage.getItem("auth-token") ||
      localStorage.getItem("adminAuthToken")
    ) {
      window.scrollTo(0, 0);
      getResources();
    } else {
      navigate("/login-signup");
      props.showAlert(
        "You are logged out because of inactivity",
        "danger"
      );
    }

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