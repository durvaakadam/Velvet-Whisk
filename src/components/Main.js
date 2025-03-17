import React, { useState, useEffect } from 'react';
import './Main.css';
import { Link } from 'react-router-dom'; // Ensure this line is present


// Utility function to darken a hex color
const darkenHexColor = (hex, percent) => {
  const num = parseInt(hex.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00FF) - amt,
    B = (num & 0x0000FF) - amt;

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

const Main = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { background: '#ee915c', content: 'ALMOND ', img: '/img/almond_bg.png' },
    { background: '#ff94b0', content: 'ROSE MILK', img: '/img/rose_bg.png' },
    { background: '#c7c455', content: 'PISTA MILK', img: '/img/pista_bg.png' }
  ];

  const [leftMockup, setLeftMockup] = useState(0);
  const leftEachItem = 100 / (items.length - 1);
  const [activeBackground, setActiveBackground] = useState(items[0].background); // New state for active background color

  const nextItem = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex >= items.length - 1 ? 0 : prevIndex + 1);
      setActiveBackground(items[newIndex].background); // Update the background color
      return newIndex;
    });
    setLeftMockup((prevLeft) => prevLeft + leftEachItem);
  };

  const prevItem = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex <= 0 ? items.length - 1 : prevIndex - 1);
      setActiveBackground(items[newIndex].background); // Update the background color
      return newIndex;
    });
    setLeftMockup((prevLeft) => prevLeft - leftEachItem);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextItem();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const darkBackground = darkenHexColor(activeBackground, 20); // Darken by 20%

  return (
    <div className="App">
      <header>
      <div className="logo">      </div>
        <nav>
          <div className="auth-buttons">
            <Link to="/login">
              <button className="login-btn" style={{ backgroundColor: darkBackground }}>{/* Darker shade */}
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn" style={{ backgroundColor: darkBackground }}>Sign Up</button>
            </Link>
          </div>
        </nav>
      </header>

      <div className="carousel">
        <div className="list">
          {items.map((item, index) => (
            <div
              key={index}
              className={`item ${index === activeIndex ? 'active' : index < activeIndex ? 'hidden' : ''}`}
              style={{ '--background': item.background }}>
              <div className="content">{item.content}</div>
              <img src={item.img} className="fruit" alt={item.content} />
            </div>
          ))}
        </div>
        <div className="leaves"></div>
        <div className="mockup" style={{ '--left': `${leftMockup}%` }}></div>

        <div className="shadow"></div>
        <div className="arrow">
          <button id="prev" onClick={prevItem}>{'<'}</button>
          <button id="next" onClick={nextItem}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
