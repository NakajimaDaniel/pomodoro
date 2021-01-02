import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';




function App() {


  const [seconds, setSeconds] = useState(10);
  const [minutes, setMinutes] = useState(0);
  const[stopvar, setStopvar] = useState(false);

  const startStop = ()=>{
    setStopvar(true)
    console.log(stopvar)
    if(stopvar == true)
    setStopvar(false)
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



  return (
    <div className="App">

      <div className="title">
        <p>Pomodoro</p>
        <p>Timer</p>
      </div>

      <div className="timer">
        <h2>
          {minutes<10 ? `0${minutes}` : minutes }:{seconds<10 ? `0${seconds}` : seconds}
        </h2>

        <div className="button">
          <button onClick={startStop}>Start/Stop</button>
        </div>

      </div>
      
      <div className="time-adjust">
        <p>d</p>
      </div>

    </div>
    
  );
}

export default App;
