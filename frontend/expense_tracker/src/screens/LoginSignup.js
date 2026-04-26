import React, { useState } from "react";
import { createUser, loginUser } from "../Api"; 
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import  login  from "../assets/login.svg";

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [cookies, setCookie] = useCookies();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username")?.value;

    try {
      if (isLogin) {
      
        const response = await loginUser(email, password);
      
        const userData = await response.data;

        setCookie("userId", userData); 
        if(response.status == "success")
        {
            navigate("/dashBoard", { replace: true })
        }
      
      } else {
        const response = await createUser(username, email, password);
          if(response.status == "success")
        {
            toast.success("Account created successfully! 🎉");
            setSuccessMessage("Account created successfully! Please log in.");
            setIsLogin(true);
        } else {
            setError(response.message || "Signup failed. Please try again.");
        }
      }
      
    } catch (error) {
      setError("An error occurred. Please try again."); 
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)' }}>
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl mb-2">💸</div>
          <h4 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Spendly</h4>
          <p className="text-gray-400 text-sm mt-1">{isLogin ? "Welcome back!" : "Create your account"}</p>
        </div>
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl mb-4 text-sm text-center font-medium">
            ✅ {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl mb-4 text-sm text-center font-medium">
            {error}
          </div>
        )}
        <form>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="p-2.5 block w-full rounded-xl border border-gray-200 bg-gray-50/50 shadow-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2.5 block w-full rounded-xl border border-gray-200 bg-gray-50/50 shadow-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-2.5 block w-full rounded-xl border border-gray-200 bg-gray-50/50 shadow-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="text-sm text-gray-500 mb-4 flex justify-between">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <div className="text-sm font-semibold cursor-pointer hover:underline transition-colors"
                 style={{ color: '#6d28d9' }}
                 onClick={toggleForm}>
              {isLogin ? "Sign Up" : "Log In"}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white py-2.5 px-4 w-full rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </div>
        </form>
        <img src={login} alt="Spendly" className="w-full mt-6 opacity-80" />
      </div>
    </div>
  );
};

export default LoginSignupPage;
