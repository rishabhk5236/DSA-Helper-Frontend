import React from "react";
import "../CSS/Jobs.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import resourcesContext from "../Context/resourcesContext";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";

export default function Jobs(props) {

  const host=props.base_url
  const navigate = useNavigate();
  const context = useContext(resourcesContext);
  const { jobs, getJobs } = context;
  const closeAddJobModalref = useRef();
  // this data is for adding the new job
  const [addJobInputData, setAddJobInputData] = useState({
    title: "",
    company: "",
    position: "",
    package: "",
    course: "",
    batch: "",
    location: "",
    url: "",
  });




  // handling onChange

  const handleAddJobInputDataOnChange = (e) => {
    setAddJobInputData({ ...addJobInputData, [e.target.name]: e.target.value });
  };

  // handling add job

  const handleAddJob = async () => {
    if (
      addJobInputData.title === "" ||
      addJobInputData.company === "" ||
      addJobInputData.course === "" ||
      addJobInputData.package === "" ||
      addJobInputData.position === "" ||
      addJobInputData.location === "" ||
      addJobInputData.url === "" ||
      addJobInputData.batch === ""
    ) {
      toast.error("Please Fill all fields", {
        toastId: "addingJobError",
      });
      return;
    } else {
      // adding the job

      const addingJobsResponse = await fetch(`${host}/api/jobs/addjobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: addJobInputData.title,
          company: addJobInputData.company,
          position: addJobInputData.position,
          package: addJobInputData.package,
          course: addJobInputData.course,
          batch: addJobInputData.batch,
          location: addJobInputData.location,
          url: addJobInputData.url,
        }),
      });
      const addingJobsJson = await addingJobsResponse.json();
      if (addingJobsJson.success) {
        getJobs();
        toast.success(addingJobsJson.message, {
          toastId: "jobAdded",
        });
        setAddJobInputData({
          title: "",
          company: "",
          position: "",
          package: "",
          course: "",
          batch: "",
          location: "",
          url: "",
        });
        closeAddJobModalref.current.click();
      } else {
        toast.error(addingJobsJson.error, {
          toastId: "jobNotAdded",
        });
        closeAddJobModalref.current.click();
      }
    }
  };

  // this code is for deleting the job 
  const handleDeleteJob=async (id)=>{
    const deleteJobResponse= await fetch(`${host}/api/jobs/deletejobs/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json"
      },
    })

    const deleteJobJson=await deleteJobResponse.json();
    if(deleteJobJson.success){
      toast.success(deleteJobJson.message,{
        toastId:"DeletedJob"
      })
      getJobs();
    }
    else{
      toast.error(deleteJobJson.error,{
        toastId:"errorDeletedjob"
      })
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem("auth-token") ||
      localStorage.getItem("adminAuthToken")
    ) {
      window.scroll(0, 0);
      getJobs();
      
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="container jobsContainer">
        <h1 className="heading">Explore the Jobs</h1>
        {localStorage.getItem("adminAuthToken") && (
          <button
            className="btn btn-outline-success"
            data-bs-toggle="modal"
            data-bs-target="#addjobmodal"
          >
            Add Jobs
          </button>
        )}

        <div className="row d-flex justify-content-center videosSection">
          {jobs.map((element, index) => {
            return (
              <div key={element.url} className="card col-md-2">
                <div className="card-body">
                  <h5 className="card-title">
                    {index + 1}. {element.title}
                  </h5>
                  <h6 className="card-title">Position : {element.position}</h6>
                  <h6 className="card-title">Company : {element.company}</h6>
                  <h6 className="card-title">Package : {element.package}</h6>
                  <p className="card-text">Course : {element.course}</p>
                  <p className="card-text">Batch : {element.batch}</p>
                  <p className="card-text">Location : {element.location}</p>
                  <a
                    href={element.url}
                    target="_blank"
                    className="btn btn-success mt-2"
                  >
                    Apply Now
                  </a>
                  {localStorage.getItem("adminAuthToken") &&<button
                    onClick={()=>{handleDeleteJob(element._id)}}
                    className="btn btn-danger mt-2"
                  >
                    Delete Job
                  </button>}
                </div>
              </div>
            );
          })}
        </div>

        {/* this modal is for adding the job  */}

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="addjobmodal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Add Job Article
                </h5>
                <button
                  type="button"
                  class="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {/* this code is for modal body  */}

                <form>
                  <div class="mb-3">
                    <label for="title" class="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="title"
                      name="title"
                      value={addJobInputData.title}
                      onChange={handleAddJobInputDataOnChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="company" class="form-label">
                      Company
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="company"
                      placeholder="company"
                      name="company"
                      value={addJobInputData.company}
                      onChange={handleAddJobInputDataOnChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="position" class="form-label">
                      Position
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="position"
                      placeholder="position"
                      name="position"
                      value={addJobInputData.position}
                      onChange={handleAddJobInputDataOnChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="package" class="form-label">
                      Package
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="package"
                      placeholder="package"
                      name="package"
                      value={addJobInputData.package}
                      onChange={handleAddJobInputDataOnChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="course" class="form-label">
                      Course
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="course"
                      placeholder="course"
                      name="course"
                      value={addJobInputData.course}
                      onChange={handleAddJobInputDataOnChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="batch" class="form-label">
                      Batch
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="batch"
                      placeholder="batch"
                      name="batch"
                      value={addJobInputData.batch}
                      onChange={handleAddJobInputDataOnChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="location" class="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="location"
                      placeholder="location"
                      name="location"
                      value={addJobInputData.location}
                      onChange={handleAddJobInputDataOnChange}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="url" class="form-label">
                      Url
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="url"
                      placeholder="url"
                      name="url"
                      value={addJobInputData.url}
                      onChange={handleAddJobInputDataOnChange}
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  ref={closeAddJobModalref}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={handleAddJob}
                >
                  Add Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
