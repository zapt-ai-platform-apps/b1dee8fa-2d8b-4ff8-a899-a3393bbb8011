import React, { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';

export default function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef(null);
  
  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);
  
  // Handle timer countdown
  useEffect(() => {
    let interval = null;
    
    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (isRunning && totalSeconds === 0 && !isComplete) {
      setIsComplete(true);
      setIsRunning(false);
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else if (!isRunning && totalSeconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, totalSeconds, isComplete]);
  
  // Update display values
  useEffect(() => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
  }, [totalSeconds]);
  
  const startTimer = () => {
    if (totalSeconds > 0) {
      setIsRunning(true);
      setIsComplete(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };
  
  const pauseTimer = () => {
    setIsRunning(false);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTotalSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const setTime = () => {
    const newTotalSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    setTotalSeconds(newTotalSeconds);
  };
  
  const stopAlarm = () => {
    setIsComplete(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        {isComplete ? (
          <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg text-center mb-4">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Time's Up!</h3>
            <button 
              onClick={stopAlarm}
              className="btn btn-primary"
            >
              Stop Alarm
            </button>
          </div>
        ) : (
          <div className="text-6xl font-bold text-center mb-4 font-mono">
            {String(hours).padStart(2, '0')}:
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </div>
        )}
        
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`btn ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'btn-primary'} flex items-center`}
            disabled={totalSeconds === 0 && !isRunning}
          >
            {isRunning ? <><FiPause className="mr-2" /> Pause</> : <><FiPlay className="mr-2" /> Start</>}
          </button>
          
          <button
            onClick={resetTimer}
            className="btn btn-ghost flex items-center"
          >
            <FiRefreshCw className="mr-2" /> Reset
          </button>
        </div>
      </div>
      
      {!isRunning && (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Set Timer</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hours
              </label>
              <input
                type="number"
                min="0"
                max="99"
                value={hours}
                onChange={(e) => {
                  const value = Math.min(Math.max(0, parseInt(e.target.value) || 0), 99);
                  setHours(value);
                }}
                onBlur={setTime}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Minutes
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => {
                  const value = Math.min(Math.max(0, parseInt(e.target.value) || 0), 59);
                  setMinutes(value);
                }}
                onBlur={setTime}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Seconds
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => {
                  const value = Math.min(Math.max(0, parseInt(e.target.value) || 0), 59);
                  setSeconds(value);
                }}
                onBlur={setTime}
                className="input"
              />
            </div>
          </div>
          
          <button
            onClick={startTimer}
            className="btn btn-primary w-full"
            disabled={hours === 0 && minutes === 0 && seconds === 0}
          >
            Set & Start Timer
          </button>
        </div>
      )}
    </div>
  );
}