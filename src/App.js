import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import useInterval from './useInterval'




const App = () => {

    const [sessionLength, SetSessionLength] = useState(25);
    const [breakLength, SetBreakLength] = useState(5);
    const [time, SetTime] = useState(sessionLength * 60 * 1000)
    const [active, SetActive] = useState(false);
    const [mode, SetMode] = useState('session');

    const HandleReset = () => {
      SetSessionLength(25);
      SetBreakLength(5);
      SetActive(false);
      SetMode('session');
    }

    const HandleBreakDecrement = () => {
      if(breakLength <=1 ) {
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
      if(sessionLength <=1 ) {
        return null;
      } else {
        SetSessionLength(sessionLength-1);
      }
    }

    const HandleSessionIncrement = () => {
      if(sessionLength >=60 ) {
        return null;
      } else {
        SetSessionLength(sessionLength+1);
      }
    }

    useEffect(() => {
      if(time === 0 && mode === 'session') {
        SetMode('break')
        SetTime(breakLength * 60 * 1000)
      } else if (time === 0 && mode === 'break') {
        SetMode('session')
        SetTime(sessionLength * 60 * 1000)
      }

    },[time,breakLength,sessionLength,mode])

    useEffect(() => {
      SetTime(sessionLength * 60 * 1000)
    }, [sessionLength])

    useInterval(() => SetTime(time - 1000), active ? 1000 : null)

  return (

    <section className="container">
      <header className="row text-center justify-content-center">
        <div className="col">
          <h1>Pomodoro Timer</h1>
        </div>
      </header>
      <div className="row bg-light justify-content-center text-center">
        <div className="col">
          <h2>{mode === 'session' ? 'Session' : 'Break'}</h2>
          <h2><Moment format="mm:ss">{time}</ Moment></h2>
        </div>
      </div>
      <div className="row text-center">
        <div className="col align-middle">
          <h2>Session Length</h2>
          <button className="btn btn-outline-primary" onClick={HandleSessionIncrement}>+</button>
          <p>{sessionLength}</p>
          <button className="btn btn-outline-primary" onClick={HandleSessionDecrement}>-</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-success mr-1" onClick={() => SetActive(true)}>Start</button>
          <button className="btn btn-outline-primary mr-1" onClick={() => SetActive(false)}>Stop</button>
          <button className="btn btn-outline-danger" onClick={HandleReset}>Reset</button>
        </div>
        <div className="col">
        <h2>Break Length</h2>
        <button className="btn btn-outline-primary" onClick={HandleBreakIncrement}>+</button>
        <p>{breakLength}</p>
        <button className="btn btn-outline-primary" onClick={HandleBreakDecrement}>-</button>
        </div>
      </div>
    </section>


  );
}

export default App;
