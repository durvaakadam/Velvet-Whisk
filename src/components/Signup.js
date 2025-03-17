import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa"; 
import bgmilk from '../components/bgmilk.png'; 
import cansImage from '../components/cans.png'; // Importing the cans image

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      alert("Signup successful! Please check your email for verification.");
      navigate("/login");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert("Google signup successful!");
      navigate("/home");
    } catch (error) {
      alert(`Google Sign-In Error: ${error.message}`);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgmilk})` }} // Setting bgmilk as background
    >
      {/* Left side with cans image */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src={cansImage}
          alt="Cans Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side with signup form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
      <button
  type="button"
  onClick={handleGoHome}
  className="absolute top-5 left-5 bg-black text-white rounded-md px-5 py-2 text-lg shadow-md transition duration-300 hover:bg-gray-800 hover:-translate-y-1 hover:shadow-lg transform"
>
  Back to Home
</button>

        <div className="bg-white bg-opacity-80 p-10 rounded-2xl shadow-lg max-w-md mx-auto transition-transform transform hover:scale-105 animate-fadeIn">
        <h2 className="text-2xl text-gray-800 mb-8 text-center">SIGN UP</h2>

          <form onSubmit={handleSubmit}>
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
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 mb-5 border border-gray-300 rounded-md text-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-md text-lg cursor-pointer transition duration-300 hover:bg-green-700">
              Sign Up
            </button>
          </form>

          <button
            onClick={handleGoogleSignUp}
            className="w-full p-3 bg-red-600 text-white rounded-md text-lg flex items-center justify-center mt-5 transition duration-300 hover:bg-red-700"
          >
            <FaGoogle className="mr-2 text-xl" /> Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-700 text-lg">
  Already have an account?
  <button
    onClick={handleLogin}
    className="ml-3 px-5 py-2  text-blue-600 rounded-lg font-bold text-lg  transition duration-300 ease-in-out transform hover:bg-blue-50 hover:scale-105 focus:outline-none "
  >
    Login
  </button>
</p>


        </div>
      </div>
    </div>
  );
};

export default SignUp;
