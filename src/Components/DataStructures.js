import React,{useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import arrayImg from '../MediaResources/DatsStructures/ArrayLogo.png';
import linkedListImg from '../MediaResources/DatsStructures/LinkedListLogo.png';
import circularLinkedListImg from '../MediaResources/DatsStructures/circular linkedList.png';
import doublyLinkedListImg from '../MediaResources/DatsStructures/doublylinkedListimg.png';
import queueImg from '../MediaResources/DatsStructures/QueueLogo.png';
import stackImg from '../MediaResources/DatsStructures/StackLogo.png';
import binaryTreeImg from '../MediaResources/DatsStructures/binarytreeimg.png';
import binaryHeapImg from '../MediaResources/DatsStructures/binaryHeapLogo.png';
import graphsImg from '../MediaResources/DatsStructures/graphsImg.png';


export default function DataStructures(props) {

  const data=[
      {
        title: "Array",
        description:
          "In computer science, an array is a data structure that stores a collection of elements of the same data type. ",
        imageUrl: arrayImg,
        playlistId: "PLHJ19n5Es9XAG6ECU_hrx3Y5NqirtCYTw",
      },
      {
        title: "Linked List",
        description:"A linked list is a data structure that consists of a collection of nodes which together represent a sequence. ",
        imageUrl: linkedListImg,
        playlistId: "PLHJ19n5Es9XAYShN0jHCCRF1NttS03kB1",
      },
      {
        title: "Doubly Linked List",
        description:
          "Here Each node contains two link fields (references to the previous and to the next node in the sequence of nodes) and one data field. ",
        imageUrl: doublyLinkedListImg,
        playlistId: "PLHJ19n5Es9XB4-AjfNtGolDC1RXpvAE0v",
      },
      {
        title: "Circular Linked List",
        description:
          "A circular linked list is a linked list where the last node points to the first node, creating a circular loop.",
        imageUrl: circularLinkedListImg,
        playlistId: "PLHJ19n5Es9XAbD3TtAkYo-U3a3Ix3Mfjf",
      },
      {
        title: "Stack",
        description:
          "A stack is a linear data structure that follows the LIFO (Last In First Out) principle. ",
        imageUrl: stackImg,
        playlistId: "PLHJ19n5Es9XDtUpSPgBwpFw5ESBaVEwJ1",
      },
      {
        title: "Queue",
        description:
          "A queue is a data structure that consists of a list of records such that records are added at one end and removed from the other.",
        imageUrl: queueImg,
        playlistId: "PLHJ19n5Es9XCJzuhN7MNFqH_y5_W9xTkw",
      },
      {
        title: "Binary Tree",
        description:
          "A binary tree is a tree data structure in which each node can have at most two children, which are referred to as the left child and the right child.",
        imageUrl: binaryTreeImg,
        playlistId: "PLHJ19n5Es9XAber3XdLHTRW1diBaJoCZR",
      },
      {
        title: "Binary Heap",
        description:
          "A binary heap is a heap data structure that takes the form of a binary tree. Binary heaps are a common way of implementing priority queues.",
        imageUrl: binaryHeapImg,
        playlistId: "PLHJ19n5Es9XAYi2FlMxnjaW_obYa-Iert",
      },
      {
        title: "Graphs",
        description:
          "A Graph is a collection of vertices (also called nodes or points) and edges (also called links or lines) that connect pairs of vertices.",
        imageUrl: graphsImg,
        playlistId: "PLHJ19n5Es9XAF7ADsCG8-GJYuuT_FFhNu",
      }
  ]
 
// this code is for handleing the ds click 
  const handleDSCardClick=()=>{
    
  }
  
    const navigate = useNavigate();
  
  
    useEffect(() => {
      if (localStorage.getItem("auth-token") || localStorage.getItem('adminAuthToken')) {
       
        window.scrollTo(0, 0);

      } else {
        navigate("/login-signup");
        props.showAlert(
          "You are logged out because of being inactive for 30 minutes",
          "danger"
        );
      }
    }, []);
    

  return (
    <>
     <div className="container">
        <h1 className="text-center mt-2">Data Structures</h1>
        <p className='text-center'>Please Select One Data Structure which you want to Learn</p>
        
        {/* this code is for all dataStructure cards  */}
        


        <div className="menuCardGroup row justify-content-center">
          {data.map((element) => {
            return (
              <div key={element.title} className="card col-md-4 menuCard">
                <img src={element.imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">
                    {element.description}
                  </p>
                  <Link to="/playlistpage" onClick={()=>props.setplaylistid(element.playlistId)} className="btn btn-success">
                    Start Learning
                  </Link>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </>
  )
}
