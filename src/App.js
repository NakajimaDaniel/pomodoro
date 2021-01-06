import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Helmet} from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

function App() {

  const startIcon = <FontAwesomeIcon icon={faPlay} color="#474747"/>
  const pauseIcon = <FontAwesomeIcon icon={faPause} color="#FFC5C5"/>
  const redoIcon = <FontAwesomeIcon icon={faRedoAlt} color='#474747'/>


  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [stopvar, setStopvar] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [sessionControl, setSessionControl] = useState(true);

  const [breakSeconds, setBreakSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);

  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [sessionMinutes, setSessionMinutes] = useState(0);


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
    setSessionSeconds(0);
    setSessionMinutes(25);
    setSeconds(0);
    setMinutes(25);
    setStopvar(true);
    setDisabled(false);
    setSessionControl(true);
  }

  const StartStopButton = withStyles({
    root: {
      background: stopvar == true ? 'linear-gradient(45deg, #298F2D 30%, #5CB160 90%)' : 'linear-gradient(45deg, #A90000 30%, #FF2424 90%)',
      borderRadius:10,
      border: 0,
      color: 'white',
      height: 35,
      padding: '0 30px',
      boxShadow: 'none',
      width: 100,
    }
  })(Button);


  const ResetButton = withStyles({
    root: {
      background:'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      borderRadius:10,
      border: 0,
      color: 'white',
      height: 35,
      padding: '0 30px',
      boxShadow: 'none',
      width: 100,
    }
  }) (Button);

  useEffect(()=>{

    const myCount = setInterval(() => 
    {

        if (seconds > 0) 
        {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) 
        {
          if (minutes == 0) 
          {
            clearInterval(myCount);
            if(sessionControl == true)
            {
              setSessionControl(false);
              setSeconds(breakSeconds);
              setMinutes(breakMinutes);
            }
            if(sessionControl == false)
            {
              setSessionControl(true);
              setSeconds(sessionSeconds);
              setMinutes(sessionMinutes);
            }
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
      setSessionMinutes(sessionMin)
      setMinutes(sessionMin)
    }

    const onChangeSessionSeg = (e)=>{
      let sessionSeg = e.target.value;
      setSessionSeconds(sessionSeg)
      setSeconds(sessionSeg)
    }

    const onChangeBreakMin = (e)=>{
      let breakMin = e.target.value;
      setBreakMinutes(breakMin);
    }

    const onChangeBreakSeg = (e)=>{
      let breakSeg = e.target.value;
      setBreakSeconds(breakSeg);
    }

  return (
    <div className="App">
      <helmet>
        <title>{sessionControl == true ? `Working Session` : `Break`} {minutes<10 ? `0${minutes}` : minutes }:{seconds<10 ? `0${seconds}` : seconds}</title>
      </helmet>

      <div className="title">
        <p>Pomodoro</p>
        <p>Timer</p>
      </div>

      <div className="timer">
        <p>{sessionControl == true ? `Working Session` : `Break`}</p>
        <h2>
          {minutes<10 ? `0${minutes}` : minutes }:{seconds<10 ? `0${seconds}` : seconds}
        </h2>

        <div className="button-wrap">
          <div className="start-stop-button">
            <StartStopButton onClick={startStop}>{stopvar === true ? startIcon : pauseIcon} </StartStopButton>
          </div>


          <div className="reset-button">
            <ResetButton onClick={resetButton}>{redoIcon}</ResetButton>
          </div>
        </div>
      </div>
      
      <div className="time-adjust">
        <div className="session-box">
          <h2>Session</h2>
          <div className="session-adjust-min">
            <input type="number" min="0" max="60" onChange={onChangeSessionMin} value={sessionMinutes} disabled={disabled}></input>
            <h2>min</h2>
          </div>
          <div className="session-adjust-seg">
            <input type="number" min="0" max="60" onChange={onChangeSessionSeg} value={sessionSeconds} disabled={disabled}></input>
            <h2>seg</h2>
          </div>
        </div>

        <div className="break-box">
          <h2>Break</h2>
          <div className="break-adjust-min">
            <input type="number" min="0" max="60" onChange={onChangeBreakMin} value={breakMinutes} disabled={disabled}></input>
            <h2>min</h2>
          </div>
          <div className="break-adjust-seg">
            <input type="number" min="0" max="60" onChange={onChangeBreakSeg} value={breakSeconds} disabled={disabled}></input>
            <h2>seg</h2>
          </div>
        </div>


      </div>

    </div>
    
  );
}

export default App;
