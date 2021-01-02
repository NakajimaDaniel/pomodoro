import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';




function App() {


  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [stopvar, setStopvar] = useState(true);
  const [disabled, setDisabled] = useState(false);
  

  const startStop = ()=>{
    if(stopvar === false)
    setStopvar(true)
   
    if(stopvar === true)
    {
      setStopvar(false);
      setDisabled(true);
    }
   
  }

  const resetButton = ()=>{
    setSeconds(0);
    setMinutes(25);
    setStopvar(true);
    setDisabled(false);
  }

  useEffect(()=>{
    const myCount = setInterval(() => 
    {

        if (seconds > 0) 
        {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) 
          {
            if (minutes === 0) 
            {
              clearInterval(myCount)
            } 
            else 
            {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
      }


    }, 1000)
          
      if(stopvar === true)
      {
        clearInterval(myCount);
      }

      return ()=> 
      {
        clearInterval(myCount);
      };

    });



    const onChangeSessionMin = (e)=>{
      let sessionMin = e.target.value;
      setMinutes(sessionMin)
    }

    const onChangeSessionSeg = (e)=>{
      let sessionSeg = e.target.value;
      setSeconds(sessionSeg)
    }

  return (
    <div className="App">

      <div className="title">
        <p>Pomodoro</p>
        <p>Timer</p>
      </div>

      <div className="timer">
        <p>Session</p>
        <h2>
          {minutes<10 ? `0${minutes}` : minutes }:{seconds<10 ? `0${seconds}` : seconds}
        </h2>

        <div className="button-wrap">
          <div className="start-stop-button">
            <button onClick={startStop}>Start/Stop</button>
          </div>
          <div className="reset-button">
            <button onClick={resetButton}>Reset</button>
          </div>
        </div>
      </div>
      
      <div className="time-adjust">
        <div className="session-box">
          <h2>Session</h2>
          <div className="session-adjust-min">
            <input type="number" min="0" max="60" onChange={onChangeSessionMin} value={minutes} disabled={disabled}></input>
            <h2>min</h2>
          </div>
          <div className="session-adjust-seg">
            <input type="number" min="0" max="60" onChange={onChangeSessionSeg} value={seconds} disabled={disabled}></input>
            <h2>seg</h2>
          </div>
        </div>

        <div className="break-box">
          <h2>Break</h2>
          <div className="break-adjust-min">
            <input type="number" min="0" max="60"></input>
            <h2>min</h2>
          </div>
          <div className="break-adjust-seg">
            <input type="number" min="0" max="60"></input>
            <h2>seg</h2>
          </div>
        </div>


      </div>

    </div>
    
  );
}

export default App;
