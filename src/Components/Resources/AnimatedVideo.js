import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import addPng from "../../MediaResources/AdminPlaylistVideoResources/add.png";
import deletePng from "../../MediaResources/AdminPlaylistVideoResources/delete.png";

export default function AnimatedVideo(props) {
  const [animatedVideo, setAnimatedVideo] = useState([]);
  
  const refOpenAddAnimeVideoModal = useRef();
  const refCloseAddAnimeVideoModal = useRef();
  const refDeleteAnimeVideoVerifyModal_close = useRef();
  const refDeleteAnimeVideoVerifyModal_open = useRef();

  const [AnimeVideoIdTodelete, setAnimeVideoIdToDelete] = useState("");
  const [addAnimeVideo, setAddAnimeVideo] = useState({
    title: "",
    author: "",
    playlistUrl: "",
  });

  const getAnimatedVideo = async () => {
    const response = await fetch(
      `${props.base_url}/api/animatedvideo/fetchanimatedvideo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    setAnimatedVideo(json);
  };


   //extracting playlist id from the url

   const extractPlaylistId=(url)=>{
    const listId = url.split("list=")[1];
    return listId;
  }
  // adding animated video 

  const handleAddAnimeVideoClick = async () => {
    const { title, author, playlistUrl } = addAnimeVideo;
    let imageUrl;
    const index = (animatedVideo.length + 1).toString();

    const playlistId=extractPlaylistId(playlistUrl);

    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${playlistId}&key=AIzaSyCVox0-4KAlKOuP_6DF2Cq_Ak8uX3a2hAY`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const fetchAnimatedVideoJSON = await res.json();
    if (fetchAnimatedVideoJSON.error) {
      toast.error("Playlist Not Found Please Enter a valid Playlist URL",{toastId:"invalidPlaylist"});
      refCloseAddAnimeVideoModal.current.click();
      return;
    } else {
      imageUrl = fetchAnimatedVideoJSON.items[0].snippet.thumbnails.maxres.url;
    }

    const response = await fetch(`${props.base_url}/api/animatedvideo/addanimatedvideo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, playlistId, imageUrl, index }),
    });

    const json=await response.json();

    if(json.success){
      toast.success(json.message,{
        toastId:"animatedVideoAddedSuccessFully"
      })
    }else{
      toast.error(json.error,{
        toastId:"animatedVideoAddingError"
      })
    }

    
    getAnimatedVideo();
    refCloseAddAnimeVideoModal.current.click();
    setAddAnimeVideo({
      title: "",
      author: "",
      playlistUrl: "",
    });
  };

  const addAnimeVideoOnchange = (element) => {
    setAddAnimeVideo({
      ...addAnimeVideo,
      [element.target.name]: element.target.value,
    });
  };

  const handleDeleteAnimeVideoBtn = async (id) => {
    const response = await fetch(
      `${props.base_url}/api/animatedvideo/deleteanimatedvideo/${id}`,
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
        toastId:"animatedVideoDeletedSuccessFully"
      })
    }else{
      toast.error(json.error,{
        toastId:"animatedVideoDeletedError"
      })
    }
    getAnimatedVideo();
    refDeleteAnimeVideoVerifyModal_close.current.click();
  };

  useEffect(() => {
    getAnimatedVideo();
  }, []);

  return (
    <>
      <div className="container adminPlaylistOSAnimatedVideosMainContainer">
        {/* this is for One Shot Videos  */}

        <div className="d-flex justify-content-between">
          <h2 className="text-center AdminPlaylistHeading">Animated Videos</h2>
          <img
            className="addPlaylistIcon"
            src={addPng}
            alt=".."
            onClick={() => {
              refOpenAddAnimeVideoModal.current.click();
            }}
          />
        </div>

        {/* this is the modal for adding new playlist  */}
        <button
          style={{ display: "none" }}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addAnimeVideoModal"
          ref={refOpenAddAnimeVideoModal}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="addAnimeVideoModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add Animated Video
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
                      onChange={addAnimeVideoOnchange}
                      value={addAnimeVideo.title}
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
                      onChange={addAnimeVideoOnchange}
                      value={addAnimeVideo.author}
                    />
                  </div>
                  <div className="form-group m-3 ">
                    <label htmlFor="playlistUrl">Playlist Url</label>
                    <input
                      type="text"
                      className="form-control"
                      id="playlistUrl"
                      placeholder="Enter Playlist id"
                      name="playlistUrl"
                      onChange={addAnimeVideoOnchange}
                      value={addAnimeVideo.playlistUrl}
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refCloseAddAnimeVideoModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddAnimeVideoClick}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* here we fetch all Playlists  */}

        {animatedVideo.map((element) => {
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
                    setAnimeVideoIdToDelete(element._id);
                    refDeleteAnimeVideoVerifyModal_open.current.click();
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
          data-bs-target="#deleteAnimeVideoVerification"
          style={{ display: "none" }}
          ref={refDeleteAnimeVideoVerifyModal_open}
        >
          Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="deleteAnimeVideoVerification"
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
                  ref={refDeleteAnimeVideoVerifyModal_close}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    handleDeleteAnimeVideoBtn(AnimeVideoIdTodelete);
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
