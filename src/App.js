import React, { useState, useEffect, useRef } from 'react';
import {useInterval} from './useInterval'
import ReactFCCtest from 'react-fcctest';
import beep_file from './BeepSound.wav'

const App = () => {

    const [sessionLength, SetSessionLength] = useState(25);
    const [breakLength, SetBreakLength] = useState(5);
    const [time, SetTime] = useState(sessionLength * 60 * 1000)
    const [active, SetActive] = useState(false);
    const [mode, SetMode] = useState('session');
    const beep = useRef();




    // https://gist.github.com/asabaylus/866265/1bc8159a43a91d87b09b42bcf07fcb5a4a28e7af
    const convertMilliseconds = (ms, p) => {
      let pattern = p,
    arrayPattern = pattern.split(":"),
    clock = [ ],
    minutes = Math.floor ( ms / 60000), // 1 Minutes = 60000 Milliseconds
    seconds = Math.floor ((( ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds	
  // build the clock result
  function createClock(unit){
  // match the pattern to the corresponding variable
  if (pattern.match(unit)) {
    if (unit.match(/mm/)) {
      addUnitToClock(minutes, unit);
    }
    if (unit.match(/ss/)) {
      addUnitToClock(seconds, unit);
    };
    }
  }
  function addUnitToClock(val, unit){	
    if ( val < 10 && unit.length === 2) {
      val = "0" + val;
    }	
    clock.push(val); // push the values into the clock array		
  }
  // loop over the pattern building out the clock result
  for ( var i = 0, j = arrayPattern.length; i < j; i ++ ){	
    createClock(arrayPattern[i]);		
  }
  return clock.join(":")
  }

  useInterval(() => SetTime(time - 1000), active ? 1000 : null)

  useEffect(() => {
    SetTime(sessionLength * 60 * 1000)
  }, [sessionLength])

    useEffect(() => {
      if(time === 0 && mode === 'session') {
        SetMode('break')
        SetTime(breakLength * 60 * 1000)
        beep.current.play()
      } else if (time === 0 && mode === 'break') {
        SetMode('session')
        SetTime(sessionLength * 60 * 1000)
      }

    },[time,breakLength,sessionLength,mode])



    const HandleReset = () => {
      beep.current.pause()
      beep.current.currentTime = 0
      SetSessionLength(25);
      SetBreakLength(5);
      SetActive(false);
      SetMode('session');
      SetTime(25 * 60 * 1000)
    }

    const HandleBreakDecrement = () => {
      if(breakLength === 1 ) {
        return null;
      } else {
        SetBreakLength(breakLength-1);
      }
    }

    const HandleBreakIncrement = () => {
      if(breakLength >=60 ) {
        return null;
      } else {
        SetBreakLength(breakLength+1);
      }
    }

    const HandleSessionDecrement = () => {
      if(sessionLength === 1 ) {
        return null;
      } else {
        SetSessionLength(sessionLength-1);
      }
    }

    const HandleSessionIncrement = () => {
      if(sessionLength>=60) {
        return null;
      } else {
        SetSessionLength(sessionLength+1);
      }
    }




  return (

    <section className="container">
      <ReactFCCtest />
      <audio id="beep" src={beep_file} ref={beep} />
      <header className="row text-center justify-content-center">
        <div className="col">
          <h1>Pomodoro Timer</h1>
        </div>
      </header>
      <div className="row bg-light justify-content-center text-center">
        <div className="col">
          <h2 id="timer-label">{mode === 'session' ? 'Session' : 'Break'}</h2>
          <h2 id="time-left">{convertMilliseconds(time, "mm:ss")}</h2>
        </div>
      </div>
      <div className="row text-center">
        <div className="col align-middle">
          <h2 id="session-label">Session Length</h2>
          <button className="btn btn-outline-primary" id="session-increment" onClick={HandleSessionIncrement}>+</button>
          <p id="session-length">{sessionLength}</p>
          <button className="btn btn-outline-primary" id="session-decrement" onClick={HandleSessionDecrement}>-</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-success mr-1" id="start_stop" onClick={() => SetActive(!active)}>Start / Stop</button>
          <button className="btn btn-outline-danger" id="reset" onClick={HandleReset}>Reset</button>
        </div>
        <div className="col">
        <h2 id="break-label">Break Length</h2>
        <button className="btn btn-outline-primary" id="break-increment" onClick={HandleBreakIncrement}>+</button>
        <p id="break-length">{breakLength}</p>
        <button className="btn btn-outline-primary" id="break-decrement" onClick={HandleBreakDecrement}>-</button>
        </div>
      </div>
    </section>


  );
}

export default App;
