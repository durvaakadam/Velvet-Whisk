import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { auth } from '../firebaseConfig'; // Assuming you use Firebase for authentication

const Razorpay = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, totalBill } = location.state || { cartItems: [], totalBill: 0 };
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  // Use the API key from the .env file
  const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;
  const emailJsServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const emailJsUserId = process.env.REACT_APP_EMAILJS_USER_ID;

  // Check user authentication state and get email
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        console.log('User logged in:', user.email);
      } else {
        console.log('No user logged in.');
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to send email confirmation
  const handleSendEmail = useCallback(() => {
    console.log('Attempting to send email...');
    if (!userEmail) {
      console.error('User email is missing.');
      alert('User is not logged in or email is missing.');
      return;
    }

    const templateParams = {
      to_email: userEmail,
      subject: 'Payment Confirmation - Velvet & Whisk',
      message: `Your payment of INR ${totalBill} was successful! Thank you for your order.`,
    };

    console.log('Template parameters:', templateParams);

    return emailjs
      .send("service_dxp7k7a", "template_z7ntjir", templateParams, "WfUPqJH0cRzftZSDI")
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert(`Email confirmation sent successfully to ${userEmail}!`);
        return true; // Indicate success
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send email confirmation. Check console for details.');
        return false; // Indicate failure
      });
  }, [userEmail, totalBill, "service_dxp7k7a", "template_z7ntjir", "WfUPqJH0cRzftZSDI"]);

  // Function to handle Razorpay payment
  const handlePayment = useCallback(() => {
    console.log('Initiating payment...');
    const options = {
      key: razorpayKey,
      amount: totalBill * 100,
      currency: 'INR',
      name: 'Velvet & Whisk',
      description: 'Thank you for your order!',
      image: 'https://your_logo_url.com/logo.png',
      handler: async (response) => {
        console.log('Payment successful response:', response);

        const emailSuccess = await handleSendEmail(); // Send email after payment
        if (emailSuccess) {
          navigate('/payment-success', { state: { userEmail } }); // Navigate after email is sent
        }
      },
      prefill: {
        name: 'Durva Kadam',
        email: userEmail || 'durvakadam204@gmail.com',
        contact: '8828174914',
      },
      notes: { address: 'Shantivan' },
      theme: { color: '#F37254' },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setLoading(false);
  }, [razorpayKey, totalBill, handleSendEmail, userEmail, navigate]);

  // Check userEmail and initiate payment
  useEffect(() => {
    if (userEmail) {
      handlePayment();
    }
    return () => setLoading(true);
  }, [userEmail, handlePayment]);

  return (
    <div className="payment-container">
      {loading ? (
        <h2>Processing your payment...</h2>
      ) : (
        <h2>Please complete the payment window that appears.</h2>
      )}
    </div>
  );
};

export default Razorpay;
