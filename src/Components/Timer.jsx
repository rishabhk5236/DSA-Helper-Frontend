
import React, { useState, useEffect } from 'react'
import { useTimer } from 'react-timer-hook';
import "../CSS/QuizPage.css";


export default function Timer({expiryTimestamp,totalTime,setQuizFinish}) {


  const timeCompleted = ()=>{
    
  }


    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp, onExpire: () =>  {setQuizFinish(true)}});




  return (
    
        <div className={totalSeconds <= (totalTime*0.2) ? 'timeInDanger':''}>
          <span className={totalSeconds <= 30 ? 'blink':''}>
            {hours!==0 && <span>{hours}:</span>}<span>{minutes}</span>:<span>{seconds}</span>
          </span>

        </div>
      );
}
