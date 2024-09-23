import React, { useRef, useState } from "react";
import "../CSS/QuestionPaper.css";
import notesPng from "../MediaResources/QuestionPapers/notesPNG.png";
import downloadQuestionPaperPng from "../MediaResources/QuestionPapers/downloadQuestionPaperPng.png";
import questionPaperFrontPDF from "../MediaResources/QuestionPapers/QuestionPapersPdfFrontLogo.png";

// these imports are for importing the treeview from material ui

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useEffect } from "react";
import addPng from "../MediaResources/AdminPlaylistVideoResources/add.png";
import deletePng from "../MediaResources/AdminPlaylistVideoResources/delete.png";
import { useContext } from "react";
import resourcesContext from "../Context/resourcesContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export default function QuetionPapers(props) {

  const navigate=useNavigate();

  const [addingState,setAddingState]=useState('');
  const openAddNotesAndQuestionPaperModal = useRef();
  const closeAddModal = useRef();
  const openAddYearModal = useRef();
  const closeAddYearModal = useRef();

  const [years,setYears]=useState([]);
  const [addingNotesInputData,setAddingNotesInputData]=useState({title:"",url:""});
  const [addYearInput,setAddYearInput]=useState({name:""});
  const [addQPInput,setAddQPInput]=useState({title:"",url:"",year:"",course:"",semester:""});
  
  // this code is for initializing the courses , year & semester

  const courses=["B.Tech","B.Pharm"];
  const semesters=["1","2","3","4","5","6","7","8"];

  const [papers,setPapers]=useState([]);

  // this code if for getting question papers 

  const getPapers=async ()=>{
    const getPapersResponse=await fetch(`${host}/api/questionPapers/fetchQuestionPapers`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      }
    })

    const getPapersJson=await getPapersResponse.json();
    setPapers(getPapersJson);
  }

  // calling context 
  const context=useContext(resourcesContext);
  const {notes,getNotes,host}=context;

  

  // this code is for getting years of question papers 

  const getYears=async ()=>{
    const getYearsRes=await fetch(`${host}/api/questionPaperYear/fetchQuestionPaperYears`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      }
    })

    const getYearsJson=await getYearsRes.json();
    setYears(getYearsJson);
    
  }

  // this code is for adding a new year 
  const addYear=async ()=>{
    const addYearResponse=await fetch(`${host}/api/questionPaperYear/addQuestionPaperYears`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({name:addYearInput.name})
    })

    const addYearJson=await addYearResponse.json();
    if(addYearJson.success){
      toast.success(addYearJson.message,{
        toastId:"yearAdded"
      })
      closeAddYearModal.current.click();
      getYears();
    }
    else{
      toast.error(addYearJson.error,{
        toastId:"yearDeleted"
      })
    }
  }

  const handleAddYearOnChange=(e)=>{
    setAddYearInput({...addYearInput,[e.target.name]:e.target.value});
  }

  const handleAddQPInputOnChange=(e)=>{
    setAddQPInput({...addQPInput,[e.target.name]:e.target.value});
  }

  useEffect(() => {
    if(localStorage.getItem('auth-token') || localStorage.getItem('adminAuthToken')){
      window.scroll(0, 0);
      getNotes();
      getYears();
      getPapers();
    }else{
      navigate('/');
    }
   
  }, []);

  // this code is for adding notes 
  const handleAddNotes=()=>{
    setAddingState('addNotes');
    openAddNotesAndQuestionPaperModal.current.click();

  }

  // this code is for deleting notes 
  const handleDeleteNotes=async (id)=>{
    const deleteNoteResponse= await fetch(`${host}/api/notes/deleteNotes/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json"
      },
    })

    const deleteNoteJson=await deleteNoteResponse.json();
    if(deleteNoteJson.success){
      toast.success(deleteNoteJson.message,{
        toastId:"DeletedNote"
      })
      getNotes();
    }
    else{
      toast.error(deleteNoteJson.error,{
        toastId:"errorDeletedNote"
      })
    }
  }

  // this code is for adding question paper 
  const handleAddQuestionPaper=()=>{
    setAddingState('addQuestionPapers');
    openAddNotesAndQuestionPaperModal.current.click();

  }

  // this code is for deleting the question paper 
  const handleDeleteQuestionPaper=async (id)=>{
      const deletePaperResponse=await fetch(`${host}/api/questionPapers/deleteQuestionPaper/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
      }
      })

      const deletepaperjson=await deletePaperResponse.json();
      if(deletepaperjson.success){
        toast.success(deletepaperjson.message,{
          toastId:"paperDeleted",
        })
      getPapers();

      }
      else{
        toast.error(deletepaperjson.error,{
          toastId:"paperDeletionFailed",
        })
      }

  }


  // this code is for adding notes or question papers
  const addNotesAndQuestionPaper=async ()=>{
    if(addingState!=='addNotes'){
      // this call is for when we add notes 
      

      const addingNotesResponse=await fetch(`${host}/api/notes/addNotes`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
      body: JSON.stringify({ title:addingNotesInputData.title,url:addingNotesInputData.url }),
      })
      const addingNotesJson=await addingNotesResponse.json();
      if(addingNotesJson.success){
        getNotes();
        toast.success(addingNotesJson.message,{
          toastId:"NotesAdded"
        })
        setAddingNotesInputData({title:"",url:""});
        closeAddModal.current.click();
      }
      else{
        toast.error(addingNotesJson.error,{
          toastId:"NotesNotAdded"
        })
        closeAddModal.current.click();

      }

    }
    else if(addingState!=='addQuestionPapers'){
      // this call executes when we add questionPapers 
      const addingQPRes=await fetch(`${host}/api/questionPapers/addQuestionPapers`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
      body: JSON.stringify({ title:addQPInput.title,url:addQPInput.url,course:addQPInput.course,semester:addQPInput.semester,year:addQPInput.year }),
      })

      const addingQPjson=await addingQPRes.json();
      if(addingQPjson.success){
        getPapers();
        toast.success(addingQPjson.message,{
          toastId:"addQP"
        })
        closeAddModal.current.click();
        setAddQPInput({title:"",url:"",course:"",year:"",semester:""});

      }
      else{
        toast.error(addingQPjson.error,{
          toastId:"addQPFailed"
        })
      }

    }
  }

  // this code is for handleling on change 
  const handleOnChangeOf_notes_Inputs=(e)=>{
    setAddingNotesInputData({...addingNotesInputData,[e.target.name]:e.target.value});
  }
  

  return (
    <>
      <div className="container questionPapers_notes_main_container">
        {/* this codeis for previous year question papers  */}

        <div className="QuestionPaperContainer">
          <div className="container d-flex justify-content-between">
            <h3>Access Previous Question Papers</h3>
            {localStorage.getItem("adminAuthToken") && (
              <img
                src={addPng}
                alt=".."
                className="align-self-center addingQuestionPapers align-self-end"
                onClick={handleAddNotes}
              />
              )}
              
          </div>

          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, overflowY: "auto" }}
          >
            {/* this treeview is for courses  */}
            {courses.map((courses, index) => {
              return (
                <TreeItem
                  key={courses}
                  nodeId={courses}
                  label={courses}
                >
                  {/* now this treeview is for semesters  */}
                  {semesters.map((semester) => {
                    return (
                      <div key={semester+courses} className="container d-flex">
                        
                        <TreeItem
                          key={`Semester : ${semester}`}
                          nodeId={`Semester : ${semester}`}
                          label={`Semester : ${semester}`}
                        >
                          {/* this treeitem is for question Paper years that are in semesters  */}

                          {years.map((year) => {
                            return (
                              <TreeItem
                                key={year._id}
                                nodeId={year._id}
                                label={year.name}
                                
                              >

                                {papers.map((paper) => {
                                  if(paper.year===year.name && paper.course===courses && paper.semester===semester){
                                  return (
                                    <div key={paper._id} className="container d-flex align-items-center questionPaperContainer">
                                      <img
                                        src={questionPaperFrontPDF}
                                        className="QuestionPapersFront_backPng"
                                        alt=".."
                                      />
                                      <TreeItem
                                        key={paper._id}
                                        nodeId={paper._id}
                                        label={paper.title}
                                      ></TreeItem>
                                      <a href={paper.url} target="_blank">
                                        <img
                                          src={downloadQuestionPaperPng}
                                          className="QuestionPapersFront_backPng"
                                          alt=""
                                        />
                                      </a>
                                      {localStorage.getItem(
                                        "adminAuthToken"
                                      ) && (
                                        <a
                                          onClick={() =>
                                            handleDeleteQuestionPaper(paper._id)
                                          }
                                        >
                                          <img
                                            src={deletePng}
                                            className="QuestionPapersFront_backPng"
                                            alt=""
                                          />
                                        </a>
                                      )}
                                    </div>
                                  );}
                                })}
                              </TreeItem>
                            );
                          })}
                        </TreeItem>
                      </div>
                    );
                  })}
                </TreeItem>
              );
            })}
          </TreeView>

          {localStorage.getItem('adminAuthToken')&& <button className="btn btn-success add-year-btn" onClick={()=>{openAddYearModal.current.click();}}>Add Year</button>}
        </div>

        {/* now this code is for getting notes of technologies  */}

        <div className="notesContainer">
          <div className="container d-flex justify-content-between">
            <h2 className="">Access Notes</h2>
            {localStorage.getItem("adminAuthToken") && (
              <img
                src={addPng}
                alt=".."
                className="addingNotes align-self-end"
                onClick={handleAddQuestionPaper}
              />
            )}
          </div>

          {/* this is for mapping all the notes  */}

          <div className="notes row d-flex justify-content-center">
            {notes.map((element, index) => {
              return (
                <div key={element.url} className="card noteCard col-md-4">
                  <img src={notesPng} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">
                      {index + 1}. {element.title}
                    </h5>

                    <a
                      href={element.url}
                      className="btn btn-outline-success d-flex align-items-center"
                      target="_blank"
                    >
                      <img
                        src={downloadQuestionPaperPng}
                        className="downloadNotesPng"
                        alt="..."
                      />
                      Download
                    </a>
                    {localStorage.getItem("adminAuthToken") && (
                      <a
                        className="btn btn-outline-success deleteNotesButton d-flex align-items-center"
                        onClick={() => handleDeleteNotes(element._id)}
                      >
                        <img
                          src={deletePng}
                          className="deleteNotesPng"
                          alt="..."
                        />
                        Delete
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* this modal is for adding new notes into list  */}

        <div className="addNotesAndQuestionPaperModal">
          <button
            type="button"
            ref={openAddNotesAndQuestionPaperModal}
            className="btn btn-primary"
            style={{ display: "none" }}
            data-bs-toggle="modal"
            data-bs-target="#addNotesAndQuestionPaperModal"
          >
            Launch demo modal
          </button>

          <div
            className="modal fade"
            id="addNotesAndQuestionPaperModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addNotesAndQuestionPaperModalTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Add {addingState!=='addNotes'?'Notes':'Question Papers'}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* this body is for adding notes  */}

                 {addingState!=='addNotes' && <form>
                    <div className="form-group">
                      <label htmlFor="noteTitle">Note Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="noteTitle"
                        name="title"
                        value={addingNotesInputData.title}
                        onChange={handleOnChangeOf_notes_Inputs}
                        placeholder="Enter Title"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="noteUrl">Url</label>
                      <input
                        type="text"
                        className="form-control"
                        id="noteUrl"
                        name="url"
                        value={addingNotesInputData.url}
                        onChange={handleOnChangeOf_notes_Inputs}
                        placeholder="Url"
                      />
                    </div>
                  </form>}

              {/* this modal body runs when we are adding question paper  */}
                  {addingState!=='addQuestionPapers' && 
                  <form>
                  <div className="form-group">
                    <label htmlFor="QuestionPapertitle">Title</label>
                    <input type="text" className="form-control" id="QuestionPapertitle" aria-describedby="emailHelp" name="title"value={addQPInput.title} placeholder="Enter Title" onChange={handleAddQPInputOnChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="QuestionPaperUrl">Url</label>
                    <input type="text" className="form-control" id="QuestionPaperUrl" placeholder="Enter Url" name="url" value={addQPInput.url} onChange={handleAddQPInputOnChange}/>
                  </div>
                  <label htmlFor="courseSelect">Course</label>
                  <select className="form-select form-select-lg mb-3" id="courseSelect"  aria-label=".form-select-lg example" name="course" value={addQPInput.course} onChange={handleAddQPInputOnChange}>
                  <option>Select Course</option>
                      {courses.map((element)=>{
                        return(
                          <option key={element} value={element}>{element}</option>
                        );
                      })}
                  </select>

                  <div className="form-group">
                    <label htmlFor="semester">Semester</label>
                    <select className="form-select form-select-lg mb-3" id="semester"  aria-label=".form-select-lg example" name="semester" value={addQPInput.semester} onChange={handleAddQPInputOnChange}>

                      <option>Select Semester</option>
                      {semesters.map((element)=>{
                        return (
                      <option key={element} value={element}>{element}</option>
                        );
                      })}
                  </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Year">Year</label>
                    <select className="form-select form-select-lg mb-3" id="year"  aria-label=".form-select-lg example" name="year" value={addQPInput.year}  onChange={handleAddQPInputOnChange}>
                    <option>Select Year</option>
                      {years.map((element)=>{
                        return(
                          <option key={element.name} value={element.name}>{element.name}</option>
                        );
                      })}
                     
                  </select>
                  </div>
                </form>
                }


                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={closeAddModal}
                  >
                    Close
                  </button>
                  <button type="button" onClick={addNotesAndQuestionPaper} className="btn btn-success">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>



{/* this modal is for adding year  */}

<button type="button" style={{display:'none'}} ref={openAddYearModal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddYearModal">
  Launch demo modal
</button>


<div className="modal fade" id="AddYearModal" tabIndex="-1" role="dialog" aria-labelledby="AddYearModalTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Add Year</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        

        {/* here is the body of adding year  */}
        <form>
  <div className="form-group">
    <label htmlFor="yearName">Year</label>
    <input type="text" className="form-control" id="yearName" name="name" value={addYearInput.name} onChange={handleAddYearOnChange} placeholder="Enter Year"/>
  </div>
</form>


      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={closeAddYearModal} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success" onClick={addYear}>Add</button>
      </div>
    </div>
  </div>
</div>

      </div>
    </>
  );
}
