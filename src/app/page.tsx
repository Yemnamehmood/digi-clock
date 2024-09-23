'use client'
import { useEffect, useState } from 'react';

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleFormat = () => {
    setIs24Hour(!is24Hour);
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours(); 
    const minutes = date.getMinutes(); 
    const seconds = date.getSeconds(); 
    const ampm = hours >= 12 ? 'PM' : 'AM';

    if (!is24Hour) {
      hours = hours % 12 || 12;
    }

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
      ampm: !is24Hour ? ampm : '',
    };
  };

  const { hours, minutes, seconds, ampm } = formatTime(time);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container">
      <header className="title">
        <h1>Digital Clock</h1>
      </header>
      <div className="clock-container">
        <div className="clock">
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          {!is24Hour && <span className="ampm">{ampm}</span>}
        </div>
        <button className="toggle-btn" onClick={toggleFormat}>
          Switch to {is24Hour ? '12-hour' : '24-hour'} Format
        </button>
      </div>
      <footer className="footer">
        <p>© All rights reserved. Digital Clock by Yemna Mehmood</p>
      </footer>
    </div>
  );
}
