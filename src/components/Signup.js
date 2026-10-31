import React, { useState } from "react";
import { auth, DEMO_CREDENTIALS, googleProvider } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import bgmilk from "../components/bgmilk.png";
import cansImage from "../components/cans.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Password strength requirements
  const passwordRequirements = [
    {
      label: "At least 8 characters",
      test: password.length >= 8,
    },
    {
      label: "At least one uppercase letter (A-Z)",
      test: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter (a-z)",
      test: /[a-z]/.test(password),
    },
    {
      label: "At least one number (0-9)",
      test: /[0-9]/.test(password),
    },
    {
      label: "At least one special character (!@#$, etc.)",
      test: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const isPasswordValid = passwordRequirements.every(
    (requirement) => requirement.test
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password strength before account creation
    if (!isPasswordValid) {
      alert("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (
      email === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      alert("Demo account is ready. You can log in with the demo credentials.");
      navigate("/login");
      return;
    }

    if (!auth) {
      alert("Use the demo account or configure Firebase in a .env file.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await sendEmailVerification(user);

      alert("Signup successful! Please check your email for verification.");
      navigate("/login");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!auth || !googleProvider) {
      alert(
        "Firebase is not configured. Add the values from .env.example to a .env file."
      );
      return;
    }

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
          <h2 className="text-2xl text-gray-800 mb-8 text-center">
            SIGN UP
          </h2>

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
              aria-describedby="password-requirements"
              className="w-full p-3 mb-3 border border-gray-300 rounded-md text-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            {/* Live password strength checklist */}
            <div
              id="password-requirements"
              className="text-left text-sm mb-5"
              aria-live="polite"
            >
              <p className="font-semibold mb-2">Password requirements:</p>

              {passwordRequirements.map((requirement) => (
                <p
                  key={requirement.label}
                  className={
                    requirement.test ? "text-green-600" : "text-red-600"
                  }
                >
                  {requirement.test ? "✓" : "✗"} {requirement.label}
                </p>
              ))}
            </div>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 mb-5 border border-gray-300 rounded-md text-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            <button
              type="submit"
              disabled={!isPasswordValid}
              className="w-full p-3 bg-green-600 text-white rounded-md text-lg cursor-pointer transition duration-300 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
            >
              Sign Up
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full p-3 bg-red-600 text-white rounded-md text-lg flex items-center justify-center mt-5 transition duration-300 hover:bg-red-700"
          >
            <FaGoogle className="mr-2 text-xl" /> Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-700 text-lg">
            Already have an account?
            <button
              type="button"
              onClick={handleLogin}
              className="ml-3 px-5 py-2 text-blue-600 rounded-lg font-bold text-lg transition duration-300 ease-in-out transform hover:bg-blue-50 hover:scale-105 focus:outline-none"
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