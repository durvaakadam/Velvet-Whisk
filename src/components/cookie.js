import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom'; // Importing useLocation
import { AiOutlineInfoCircle } from 'react-icons/ai';

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const cookieConsent = Cookies.get('cookieConsent');
    if (!cookieConsent && location.pathname === '/home') { // Show popup only on '/home'
      setShow(true);
    }
  }, [location.pathname]); // Add pathname as a dependency

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'accepted', { expires: 30 });
    setShow(false);
  };

  const handleDecline = () => {
    Cookies.set('cookieConsent', 'declined', { expires: 30 });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg z-50 flex flex-col md:flex-row justify-between items-center p-4 rounded-t-lg border-t-4 border-teal-400">
      <div className="flex items-center mb-2 md:mb-0">
        <AiOutlineInfoCircle className="text-teal-400 text-2xl mr-2" />
        <p className="text-white text-md md:text-lg font-medium">
          This website uses cookies to enhance the user experience. Do you accept?
        </p>
      </div>
      <div className="flex items-center">
        <button 
          onClick={handleAccept} 
          className="mr-2 px-4 py-1 bg-teal-500 text-white rounded-lg transition duration-200 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300 shadow-md">
          Accept
        </button>
        <button 
          onClick={handleDecline} 
          className="px-4 py-1 bg-red-600 text-white rounded-lg transition duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md">
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
