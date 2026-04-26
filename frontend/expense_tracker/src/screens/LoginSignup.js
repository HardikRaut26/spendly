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
    <div className="min-h-screen bg-blue-700 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-8">
        <h4 className="text-black text-xl font-bold">Spendly</h4>
        </div>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}
        <form>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="text-sm text-gray-700 mb-3 flex justify-between">  {isLogin ? "Don't have an account?" : "Already have an account?"}   <div className="text-sm text-blue-700 mb-3 cursor-pointer hover:underline"  onClick={toggleForm}>  {isLogin ? "Sign Up" : "Log In"} </div></div>
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-700 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
           
           
          </div>

        </form>
        <img src={login} alt="Spendly" className="w-full  mt-6" />
      </div>
      
    </div>
  );
};

export default LoginSignupPage;
