import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isStart, setStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (isStart) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prev) => prev - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setStart(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStart, hours, minutes, seconds]);

  const handleStart = () => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      setStart(true);
    }
  };

  const handleReset = () => {
    setStart(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handlePause = () => {
    setStart(false);
  };

  const handleInput = (e) => {
    const value = parseInt(e.target.value) || 0;
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  return (
    <>
      <h1>Countdown Timer</h1>
      {!isStart && (
        <>
          <div className="input-container">
            <div className="input-box">
              <input
                id="hours"
                onChange={handleInput}
                placeholder="HH"
                type="number"
                value={hours}
              />
              <input
                id="minutes"
                onChange={handleInput}
                placeholder="MM"
                type="number"
                value={minutes}
              />
              <input
                id="seconds"
                onChange={handleInput}
                placeholder="SS"
                type="number"
                value={seconds}
              />
            </div>
            <button className="timer-button" onClick={handleStart}>
              Start
            </button>
          </div>
        </>
      )}
      {isStart && (
        <>
          <div className="show-container">
            <div className="timer-box">
              <div>{String(hours).padStart(2, "0")}</div>
              <span>:</span>
              <div>{String(minutes).padStart(2, "0")}</div>
              <span>:</span>
              <div>{String(seconds).padStart(2, "0")}</div>
            </div>
          </div>
          <div className="action-box">
            <button className="timer-button" onClick={handlePause}>
              Pause
            </button>
            <button className="timer-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
