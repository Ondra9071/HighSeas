import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop, FaFlag } from 'react-icons/fa';

const Stopwatch: React.FC = () => {
  const savedTime = localStorage.getItem('time') ? parseInt(localStorage.getItem('time')!, 10) : 0;
  const savedFlags = localStorage.getItem('flags') ? JSON.parse(localStorage.getItem('flags')!) : [];
  const savedIsRunning = localStorage.getItem('isRunning') === 'true';

  const [isRunning, setIsRunning] = useState(savedIsRunning);
  const [seconds, setSeconds] = useState(savedTime);
  const [flags, setFlags] = useState<number[]>(savedFlags);

  const intervalId = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem('time', seconds.toString());
    localStorage.setItem('isRunning', isRunning.toString());
    localStorage.setItem('flags', JSON.stringify(flags));

    if (isRunning) {
      intervalId.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalId.current) clearInterval(intervalId.current);
    }

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [isRunning, seconds, flags]);

  const startStopHandler = () => {
    setIsRunning((prev) => !prev);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setSeconds(0);
    setFlags([]);
  };

  const flagTimeHandler = () => {
    setFlags((prevFlags) => [...prevFlags, seconds]);
  };

  const formatTime = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const remainingSeconds = sec % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-xs w-full">
        <h2 className="text-3xl font-semibold text-center mb-6">Stopwatch</h2>
        <div className="text-5xl font-mono text-center mb-8">{formatTime(seconds)}</div>

        <div className="flex justify-around mb-6 space-x-4">
          <button
            onClick={startStopHandler}
            className={`w-16 h-16 flex items-center justify-center rounded-lg text-xl transition-colors ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
          >
            {isRunning ? (
              <FaPause className="text-2xl" />
            ) : (
              <FaPlay className="text-2xl" />
            )}
          </button>
          <button
            onClick={resetHandler}
            className="w-16 h-16 flex items-center justify-center bg-gray-600 hover:bg-gray-700 rounded-lg text-xl transition-colors"
          >
            <FaStop className="text-2xl" />
          </button>
          <button
            onClick={flagTimeHandler}
            className="w-16 h-16 flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-lg text-xl transition-colors"
          >
            <FaFlag className="text-2xl" />
          </button>
        </div>


        {flags.length > 0 && (
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Flagged Times</h3>
            <ul>
              {flags.map((flag, index) => (
                <li key={index} className="text-lg">{formatTime(flag)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;