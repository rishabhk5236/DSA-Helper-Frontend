import React, { useState } from "react";
import "../CSS/Quiz.css";
import PythonLogo from "../MediaResources/Quiz/Skills/PythonLogo.png";
import JsLogo from "../MediaResources/Quiz/Skills/javascriptLogo.png";
import JavaLogo from "../MediaResources/Quiz/Skills/JavaLogo.png";
import CppLogo from "../MediaResources/Quiz/Skills/CppLogo.png";
import CSharpLogo from "../MediaResources/Quiz/Skills/cSharpLogo.png";
import RubyLogo from "../MediaResources/Quiz/Skills/RubyLogo.png";
import PhpLogo from "../MediaResources/Quiz/Skills/PhpLogo.png";
import GoLogo from "../MediaResources/Quiz/Skills/GoLogo.jpg";
import SwiftLogo from "../MediaResources/Quiz/Skills/SwiftLogo.png";
import KotlinLogo from "../MediaResources/Quiz/Skills/KotlinLogo.png";
import RustLogo from "../MediaResources/Quiz/Skills/RustLogo.png";
import ScalaLogo from "../MediaResources/Quiz/Skills/ScalaLogo.png";
import RLogo from "../MediaResources/Quiz/Skills/RLogo.png";
import TypeScriptLogo from "../MediaResources/Quiz/Skills/TypeScriptLogo.png";
import JuliaLogo from "../MediaResources/Quiz/Skills/JuliaLogo.png";
import PerlLogo from "../MediaResources/Quiz/Skills/PerlLogo.png";
import ObjectiveCLogo from "../MediaResources/Quiz/Skills/ObjectiveCLogo.png";
import DartLogo from "../MediaResources/Quiz/Skills/DartLogo.jpg";
import HaskellLogo from "../MediaResources/Quiz/Skills/HaskellLogo.png";
import LispLogo from "../MediaResources/Quiz/Skills/LispLogo.png";
import OsLogo from '../MediaResources/Quiz/Skills/OSLogo.png';
import databaseLogo from '../MediaResources/Quiz/Skills/DatabaseLogo.jpg';
import automataLogo from '../MediaResources/Quiz/Skills/AutomataLogo.png';
import oopsLogo from '../MediaResources/Quiz/Skills/oopsLogo.png';
import compilerDesignLogo from '../MediaResources/Quiz/Skills/compilerDesignLogo.png';
import daaLogo from '../MediaResources/Quiz/Skills/daaLogo.png';
import AimlLogo from '../MediaResources/Quiz/Skills/AILogo.png';
import cloudComputing from '../MediaResources/Quiz/Skills/CloudLogo.png';
import cyberSecurity from '../MediaResources/Quiz/Skills/cyberSecurityLogo.png';
import blockchainLogo from '../MediaResources/Quiz/Skills/blockchainLogo.png';
import aptitudeLogo from '../MediaResources/Quiz/Skills/aptitudeLogo.png';

import arrayImg from '../MediaResources/DatsStructures/ArrayLogo.png';
import linkedListImg from '../MediaResources/DatsStructures/LinkedListLogo.png';

import queueImg from '../MediaResources/DatsStructures/QueueLogo.png';
import stackImg from '../MediaResources/DatsStructures/StackLogo.png';
import treeImg from '../MediaResources/DatsStructures/binarytreeimg.png';
import heapImg from '../MediaResources/DatsStructures/binaryHeapLogo.png';
import graphsImg from '../MediaResources/DatsStructures/graphsImg.png';
import reasoningLogo from '../MediaResources/Quiz/Skills/ReasoningLogo.png';
import fullQuizLogo from '../MediaResources/Quiz/Skills/fullQuiz.png';
import topicWiseLogo from '../MediaResources/Quiz/Skills/topicWise.png';



export default function SkillSelection(props) {
  const category = [
    "Programming",
    "DSA",
    "Theoratical Subjects",
    "Aptitude",
    "Verbal Reasoning",
    "GATE",
  ];

  const [clicked, setClicked] = useState("Programming");

  // setting Data
  const Programming_Langauge = [
    { title: "Python", Logo: PythonLogo },
    { title: "JavaScript", Logo: JsLogo },
    { title: "Java", Logo: JavaLogo },
    { title: "C++", Logo: CppLogo },
    { title: "C#", Logo: CSharpLogo },
    { title: "Ruby", Logo: RubyLogo },
    { title: "PHP", Logo: PhpLogo },
    { title: "Go", Logo: GoLogo },
    { title: "Swift", Logo: SwiftLogo },
    { title: "Kotlin", Logo: KotlinLogo },
    { title: "Rust", Logo: RustLogo },
    { title: "Scala", Logo: ScalaLogo },
    { title: "R", Logo: RLogo },
    { title: "TypeScript", Logo: TypeScriptLogo },
    { title: "Julia", Logo: JuliaLogo },
    { title: "Perl", Logo: PerlLogo },
    { title: "Objective-C", Logo: ObjectiveCLogo },
    { title: "Dart", Logo: DartLogo },
    { title: "Haskell", Logo: HaskellLogo },
    { title: "Lisp", Logo: LispLogo },
  ];

  const DSA = [
    {title:"Array",Logo:arrayImg},
    {title:"Linked List",Logo:linkedListImg},
    {title:"Stack",Logo:stackImg},
    {title:"Queue",Logo:queueImg},
    {title:"Trees",Logo:treeImg},
    {title:"Graphs",Logo:graphsImg},
    {title:"Heap",Logo:heapImg},
  ];

  const Theoratical_subjects = [
    {title:"Operating System",Logo:OsLogo},
    {title:"Database",Logo:databaseLogo},
    {title:"Automata",Logo:automataLogo},
    {title:"OOPS",Logo:oopsLogo},
    {title:"Compiler Design",Logo:compilerDesignLogo},
    {title:"DAA",Logo:daaLogo},
    {title:"AI/ML",Logo:AimlLogo},
    {title:"Cloud Computing",Logo:cloudComputing},
    {title:"Cyber Security",Logo:cyberSecurity},
    {title:"Blockchain",Logo:blockchainLogo}
  ];

  const Aptitude = [
  {
    title: "Number Systems",
    Logo: aptitudeLogo
  },
  {
    title: "Fractions and Decimals",
    Logo: aptitudeLogo
  },
  {
    title: "Percentages",
    Logo: aptitudeLogo
  },
  {
    title: "Ratio and Proportion",
    Logo: aptitudeLogo
  },
  {
    title: "Averages",
    Logo: aptitudeLogo
  },
  {
    title: "Simple and Compound Interest",
    Logo: aptitudeLogo
  },
  {
    title: "Profit and Loss",
    Logo: aptitudeLogo
  },
  {
    title: "Time and Work",
    Logo: aptitudeLogo
  },
  {
    title: "Pipes and Cisterns",
    Logo: aptitudeLogo
  },
  {
    title: "Speed, Distance, and Time",
    Logo: aptitudeLogo
  },
  {
    title: "Trains",
    Logo: aptitudeLogo
  },
  {
    title: "Boats and Streams",
    Logo: aptitudeLogo
  },
  {
    title: "Mixtures and Alligations",
    Logo: aptitudeLogo
  },
  {
    title: "Age Problems",
    Logo: aptitudeLogo
  },
  {
    title: "Partnership",
    Logo: aptitudeLogo
  },
  {
    title: "Clocks",
    Logo: aptitudeLogo
  },
  {
    title: "Calendars",
    Logo: aptitudeLogo
  },
  {
    title: "Probability",
    Logo: aptitudeLogo
  },
  {
    title: "Permutation and Combination",
    Logo: aptitudeLogo
  },
  {
    title: "Data Interpretation",
    Logo: aptitudeLogo
  }
]


  const Verbal_reasoning = [
    {
      title: "Reading Comprehension",
      Logo: reasoningLogo
    },
    {
      title: "Verbal Analogies",
      Logo: reasoningLogo
    },
    {
      title: "Verbal Reasoning",
      Logo: reasoningLogo
    },
    {
      title: "Antonyms",
      Logo: reasoningLogo
    },
    {
      title: "Synonyms",
      Logo: reasoningLogo
    },
    {
      title: "Sentence Correction",
      Logo: reasoningLogo
    },
    {
      title: "Paragraph Completion",
      Logo: reasoningLogo
    },
    {
      title: "Critical Reasoning",
      Logo: reasoningLogo
    },
    {
      title: "Verbal Deduction",
      Logo: reasoningLogo
    },
    {
      title: "Verbal Classification",
      Logo: reasoningLogo
    },
    {
      title: "Verbal Sequencing",
      Logo: reasoningLogo
    },
    {
      title: "Verbal Order",
      Logo: reasoningLogo
    },
    {
      title: "Blood Relations",
      Logo: reasoningLogo
    },
    {
      title: "Directions",
      Logo: reasoningLogo
    },
    {
      title: "Coding-Decoding",
      Logo: reasoningLogo
    },
    {
      title: "Number Series",
      Logo: reasoningLogo
    },
    {
      title: "Letter Series",
      Logo: reasoningLogo
    },
    {
      title: "Puzzle",
      Logo: reasoningLogo
    },
    {
      title: "Picture Puzzle",
      Logo: reasoningLogo
    },
    {
      title: "Pattern Matching",
      Logo: reasoningLogo
    }
  ];
  const Gate = [
    {
      title:"Topic Wise",
      Logo:topicWiseLogo
    },
    {
      title:"Full Quiz",
      Logo:fullQuizLogo
    },
  ];

  const [data, setData] = useState(Programming_Langauge);

  // this function is made to handle the click on the category buttons 
  const handleCategoryClick = () => {
    switch (data) {
      case Programming_Langauge:
        setClicked("Programming");
        break;
      case DSA:
        setClicked("DSA");
        break;
      case Theoratical_subjects:
        setClicked("Theoratical Subjects");
        break;
      case Aptitude:
        setClicked("Aptitude");
        break;
      case Verbal_reasoning:
        setClicked("Verbal Reasoning");
        break;
      case Gate:
        setClicked("GATE");
        break;
    }

    console.log(clicked);
  };

  const handleCategory = async (element) => {
    switch (element) {
      case "Programming":
         setData(Programming_Langauge);
        setClicked("Programming");
        break;
      case "DSA":
         setData(DSA);
        setClicked("DSA");
        break;
      case "Theoratical Subjects":
         setData(Theoratical_subjects);
        setClicked("Theoratical Subjects");
        break;
      case "Aptitude":
         setData(Aptitude);
        setClicked("Aptitude");
        break;
      case "Verbal Reasoning":
         setData(Verbal_reasoning);
        setClicked("Verbal Reasoning");
        break;
      case "GATE":
         setData(Gate);
        setClicked("GATE");
        break;
      default:
         setData(Programming_Langauge);
        setClicked("Programming");
        break;
    }

    
  };

  // this function is for selecting the quiz topic
  
  const setQT=async (topic)=>{
    await props.setQuizTopic(topic);

  }

  return (
    <div className="container skillsContainer">

      <div className="card quiz-techstack">
        <div className="card-header text-center">
          Kindly select any tech stack to start your quiz
        </div>
        <div className="card-header skillCategory text-center">
          {category.map((element,index) => {
            return (
              <p
                className={`btn btn-primary ${
                  element === clicked ? "clicked" : ""
                }`}
                onClick={() => handleCategory(element)}
                key={index}
              >
                {element}
              </p>
            );
          })}
        </div>
        <div className="row skillList d-flex">
          {data.map((element, index) => {
            return (
              <div className="card skill col-md-1 " onClick={()=>setQT(element.title)} data-bs-toggle="modal" data-bs-target="#skillSelectionModal"  key={element.title}>
                <img src={element.Logo} className="card-img-top" alt="..." />
                  <p className="card-title"> {element.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
