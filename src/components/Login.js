import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import bgmilk from '../components/bgmilk.png'; // Importing the background image
import cansImage from '../components/cans.png'; // Importing the cans image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.emailVerified) {
        alert("Login successful!");
        navigate("/home");
      } else {
        alert("Please verify your email before logging in.");
      }
    } catch (error) {
      console.error("Firebase Authentication Error: ", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      navigate("/home");
    } catch (error) {
      alert(`Google Login Error: ${error.message}`);
    }
  };
  
  const handleGoHome = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgmilk})` }}
    >
      {/* Left side with cans image */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src={cansImage}
          alt="Cans Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side with login form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
      <button
  type="button"
  onClick={handleGoHome}
  className="absolute top-5 left-5 bg-black text-white rounded-md px-5 py-2 text-lg shadow-md transition duration-300 hover:bg-gray-800 hover:-translate-y-1 hover:shadow-lg transform"
>
  Back to Home
</button>

        <div className="text-center bg-white bg-opacity-80 p-10 rounded-2xl shadow-lg max-w-md mx-auto transition-transform transform hover:scale-105 animate-fadeIn">
          <h2 className="text-2xl text-gray-800 mb-8">LOGIN</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mb-5 border border-gray-300 rounded-md text-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mb-5 border border-gray-300 rounded-md text-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <div className="flex justify-between items-center mb-5">
              <label className="text-gray-600 text-sm">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="text-blue-500 text-sm hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-md text-lg cursor-pointer transition duration-300 hover:bg-green-700">
              Login
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-full p-3 bg-red-600 text-white rounded-md text-lg flex items-center justify-center mt-5 transition duration-300 hover:bg-red-700"
          >
            <FaGoogle className="mr-2 text-xl" /> Continue with Google
          </button>
          <p className="text-center mt-8 text-gray-700 text-lg">
  Don't have an account?
  <button
    onClick={handleSignup}
    className="ml-3 px-5 py-2 text-blue-600 rounded-lg font-bold text-lg transition duration-300 ease-in-out transform hover:bg-blue-50 hover:scale-105 focus:outline-none"
  >
    Sign up
  </button>
</p>

        </div>
      </div>
    </div>
  );
};

export default Login;
