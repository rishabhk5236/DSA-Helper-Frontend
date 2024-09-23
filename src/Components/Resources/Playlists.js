import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import "../../CSS/AdminPlaylistVideoResources.css";
import addPng from "../../MediaResources/AdminPlaylistVideoResources/add.png";
import deletePng from "../../MediaResources/AdminPlaylistVideoResources/delete.png";



export default function Playlists(props) {
  const [playlist, setPlaylist] = useState([]);
  const [playlistIdTodelete, setPLaylistIdToDelete] = useState("");

  const host = props.base_url;
  const refOpenAddModal = useRef();
  const refCloseModal = useRef();
  const refDeletePlaylistVerifyModal_open = useRef();
  const refDeletePlaylistVerifyModal_close = useRef();

  const [addplaylist, setAddplaylist] = useState({
    title: "",
    author: "",
    playlistUrl: "",
  });

  //   this function is to fetch all the playlists


  const getPlayList = async () => {
    const response = await fetch(`${host}/api/playlist/fetchplaylists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    setPlaylist(json);
  };

  //   this is the button for adding playlist on change
  const addplaylistOnChange = (element) => {
    setAddplaylist({
      ...addplaylist,
      [element.target.name]: element.target.value,
    });
  };


  //extracting playlist id from the url

  const extractPlaylistId=(url)=>{
    const listId = url.split("list=")[1];
    return listId;
  }
  //this is to add playlist

  const handleAddPlaylistClick = async () => {
    const { title, author, playlistUrl } = addplaylist;
    let imageUrl;
    const playlistId=extractPlaylistId(playlistUrl);


    const res=await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${playlistId}&key=AIzaSyCVox0-4KAlKOuP_6DF2Cq_Ak8uX3a2hAY`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      }
    });


    const fetchPlaylistWithIdData=await res.json();
    if(fetchPlaylistWithIdData.error){
      toast.error("Playlist Not Found Please Enter a valid Playlist URL");
      refCloseModal.current.click();

      return;
    }
    else{
      imageUrl=fetchPlaylistWithIdData.items[0].snippet.thumbnails.maxres.url;
    }

    const index=(playlist.length+1).toString();

    const response = await fetch(`${host}/api/playlist/addplaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, playlistId,imageUrl,index }),
    });

    const json=await response.json();

    if(json.success){
      toast.success(json.message,{
        toastId:"playlistAddedSuccessFully"
      })
    }else{
      toast.error(json.error,{
        toastId:"playlistAddingError"
      })
    }

    getPlayList();
    refCloseModal.current.click();
    setAddplaylist({ title: "", author: "", playlistUrl: "",});
  };

  const handleDeleteBtn = async (id) => {
    const response = await fetch(`${host}/api/playlist/deleteplaylist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json=await response.json();

    if(json.success){
      toast.success(json.message,{
        toastId:"playlistDeletedSuccessFully"
      })
    }else{
      toast.error(json.error,{
        toastId:"playlistDeletedError"
      })
    }

    getPlayList();
    refDeletePlaylistVerifyModal_close.current.click();
  };

  //this loads everytime a component loads
  useEffect(() => {
    getPlayList();
  }, []);

  return (
    <>
      <div className="container adminPlaylistOSAnimatedVideosMainContainer">
        {/* this is for playlist  */}

        <div
          className="d-flex justify-content-between"
          
        >
          <h2 className="text-center AdminPlaylistHeading">Playlists</h2>
          <img className="addPlaylistIcon" src={addPng} alt=".." onClick={() => {
            refOpenAddModal.current.click();
          }}/>
        </div>

        {/* this is the modal for adding new playlist  */}
        <button
          style={{ display: "none" }}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
          ref={refOpenAddModal}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add Playlist
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
                      onChange={addplaylistOnChange}
                      value={addplaylist.title}
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
                      onChange={addplaylistOnChange}
                      value={addplaylist.author}
                    />
                  </div>
                  <div className="form-group m-3 ">
                    <label htmlFor="playlistUrl">Playlist Url</label>
                    <input
                      type="text"
                      className="form-control"
                      id="playlistUrl"
                      placeholder="Enter playlist Url"
                      name="playlistUrl"
                      onChange={addplaylistOnChange}
                      value={addplaylist.playlistUrl}
                    />
                  </div>
                 
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddPlaylistClick}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* here we fetch all Playlists  */}

        {playlist.map((element) => {
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
                    setPLaylistIdToDelete(element._id);
                    refDeletePlaylistVerifyModal_open.current.click();
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* this modal is for taking verification from user that wheather he/she wants to delete the playlist or not */}

        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#deleteVerification"
          style={{ display: "none" }}
          ref={refDeletePlaylistVerifyModal_open}
        >
          Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="deleteVerification"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Delete Playlist
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
              <div className="modal-body">Do You want to delete Playlist</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refDeletePlaylistVerifyModal_close}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    handleDeleteBtn(playlistIdTodelete);
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
