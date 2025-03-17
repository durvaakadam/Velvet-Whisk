// src/components/PaymentSuccess.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Importing a check circle icon
import { GiMilkCarton } from 'react-icons/gi'; // Milk carton icon for the milk theme
import Confetti from 'react-confetti'; // Importing Confetti component
import bgmilk from '../components/bgmilk.png'; // Importing the background image

const PaymentSuccess = () => {
  const location = useLocation();
  const { userEmail } = location.state || { userEmail: '' };

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(true); // State to control confetti visibility
  const [fadeOut, setFadeOut] = useState(false); // State for fade out effect

  // Update window size for confetti to take up full screen
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Stop confetti and fade out after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fading out
      setTimeout(() => setShowConfetti(false), 1000); // Hide confetti after fade out
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Clean up the timer when component unmounts
  }, []);

  // Function to extract the first name from the email and remove digits
  const extractFirstNameFromEmail = (email) => {
    if (!email) return '';
    const namePart = email.split('@')[0]; // Get the part before the '@'
    const cleanedName = namePart.replace(/\d+/g, ''); // Remove digits
    return cleanedName.split(' ')[0]; // Get only the first name
  };

  const userName = extractFirstNameFromEmail(userEmail);

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${bgmilk})`, 
        backgroundSize: '120%', // Zoom out the background image
        backgroundPosition: 'center' // Center the background image
      }} 
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <div
          style={{
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 1s ease', // Transition for fading effect
          }}
        >
          <Confetti width={windowSize.width} height={windowSize.height} />
        </div>
      )}

      <div className="bg-gray-100 shadow-lg rounded-lg p-12 max-w-lg text-center relative transform transition-transform duration-500 hover:scale-105 hover:shadow-xl bg-opacity-90">
        <FaCheckCircle className="text-green-400 text-7xl mb-4 animate-bounce" />
        {/* Milk Carton Icon for fun */}
        <GiMilkCarton className="text-pink-400 text-8xl mb-9 mx-auto" />

        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">Order Success!</h1>
        <p className="text-2xl text-gray-700 mb-6">
          Thanks, <span className="text-pink-400">{userName}</span>, for your milky order!
        </p>
        <p className="text-lg text-gray-800 mb-6">
          Your payment was successful. <br /> We've sent the details to your email.
        </p>
        <p className="text-sm text-gray-500 italic">
          We appreciate your business! Need anything? Drop us a message anytime.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
