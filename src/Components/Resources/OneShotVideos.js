import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import addPng from "../../MediaResources/AdminPlaylistVideoResources/add.png";
import deletePng from "../../MediaResources/AdminPlaylistVideoResources/delete.png";

export default function OneShotVideos(props) {
  const [oneshotvideo, setOneShotVideo] = useState([]);
  const host = props.base_url;
  const refOpenAddOSVideoModal = useRef();
  const refCloseAddOSVideoModal = useRef();
  const refDeleteOSVideoVerifyModal_close = useRef();
  const refDeleteOSVideoVerifyModal_open = useRef();

  const [videoIdTodelete, setVideoIdToDelete] = useState("");
  const [addOneshotvideo, setaddOneshotvideo] = useState({
    title: "",
    author: "",
    videoUrl: "",
  });

  const getOneShotVideo = async () => {
    const response = await fetch(
      `${host}/api/oneshotvideo/fetchoneshotvideos`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    setOneShotVideo(json);
  };

  //extracting video id from the url

  const extractVideoId = (url) => {
    const videoId = url.split("watch?v=")[1].split("&list")[0];
    return videoId;
  };

  const handleAddOneShotVideoClick = async () => {
    const { title, author, videoUrl } = addOneshotvideo;

    const videoId = extractVideoId(videoUrl);
    let imageUrl;

    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyCVox0-4KAlKOuP_6DF2Cq_Ak8uX3a2hAY`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const oneShotVideoJson = await res.json();

    if (oneShotVideoJson.error) {
      toast.error("Video Not Found Please Enter a valid Video URL", {
        toastId: "invalidOneshotVideo",
      });
      refCloseAddOSVideoModal.current.click();
      return;
    }else{
      imageUrl=oneShotVideoJson.items[0].snippet.thumbnails.maxres.url;
    }

    const index = (oneshotvideo.length + 1).toString();

    const response = await fetch(`${host}/api/oneshotvideo/addoneshotvideos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, videoId, imageUrl, index }),
    });

    const json=await response.json();
    if(json.success){
      toast.success(json.message,{
        toastId:"oneShotVideoAddedSuccessFully"
      })
    }else{
      toast.error(json.error,{
        toastId:"oneShotVideoAddingError"
      })
    }

    getOneShotVideo();
    refCloseAddOSVideoModal.current.click();
    setaddOneshotvideo({ title: "", author: "", videoUrl: "" });
  };

  const addOneshotvideoOnchange = (element) => {
    setaddOneshotvideo({
      ...addOneshotvideo,
      [element.target.name]: element.target.value,
    });
  };

  const handleDeleteOneShotVideoBtn = async (id) => {
    const response = await fetch(
      `${host}/api/oneshotvideo/deleteoneshotvideos/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json=await response.json();

    if(json.success){
      toast.success(json.message,{
        toastId:"oneShotVideoDeletedSuccessFully"
      })
    }else{
      toast.error(json.error,{
        toastId:"oneShotVideoDeletedError"
      })
    }

    getOneShotVideo();
    refDeleteOSVideoVerifyModal_close.current.click();
  };

  useEffect(() => {
    getOneShotVideo();
  }, []);

  return (
    <>
      <div className="container adminPlaylistOSAnimatedVideosMainContainer">
        {/* this is for One Shot Videos  */}

        <div className="d-flex justify-content-between">
          <h2 className="text-center AdminPlaylistHeading">One Shot Videos</h2>
          <img
            className="addPlaylistIcon"
            src={addPng}
            alt=".."
            onClick={() => {
              refOpenAddOSVideoModal.current.click();
            }}
          />
        </div>

        {/* this is the modal for adding new playlist  */}
        <button
          style={{ display: "none" }}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addOSVideoModal"
          ref={refOpenAddOSVideoModal}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="addOSVideoModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add One Shot Video
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
                {/* this is the form to add the playlist */}

                <form>
                  <div className="form-group m-3 ">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Enter Title"
                      name="title"
                      onChange={addOneshotvideoOnchange}
                      value={addOneshotvideo.title}
                    />
                  </div>
                  <div className="form-group m-3 ">
                    <label htmlFor="author">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      id="author"
                      placeholder="Enter author"
                      name="author"
                      onChange={addOneshotvideoOnchange}
                      value={addOneshotvideo.author}
                    />
                  </div>
                  <div className="form-group m-3 ">
                    <label htmlFor="videoUrl">Video Url</label>
                    <input
                      type="text"
                      className="form-control"
                      id="videoUrl"
                      placeholder="Enter video url"
                      name="videoUrl"
                      onChange={addOneshotvideoOnchange}
                      value={addOneshotvideo.videoUrl}
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refCloseAddOSVideoModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddOneShotVideoClick}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* here we fetch all Playlists  */}

        {oneshotvideo.map((element) => {
          return (
            <div key={element.title} className="card playlistsCard mt-2 mb-2">
              <div className="card-body">
                <h5 className="card-title">{element.index}. {element.title}</h5>
                <p className="card-text">
                  <strong>By :</strong> {element.author}
                </p>
                <img
                  className="deletePlaylistIcon"
                  src={deletePng}
                  alt=".."
                  onClick={() => {
                    setVideoIdToDelete(element._id);
                    refDeleteOSVideoVerifyModal_open.current.click();
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* this modal is for taking verification from user that wheather he/she wants to delete the oneshotvideo or not */}

        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#deleteOSVVerification"
          style={{ display: "none" }}
          ref={refDeleteOSVideoVerifyModal_open}
        >
          Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="deleteOSVVerification"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Delete One Shot Video
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
              <div className="modal-body">Do You want to delete Video</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refDeleteOSVideoVerifyModal_close}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    handleDeleteOneShotVideoBtn(videoIdTodelete);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
