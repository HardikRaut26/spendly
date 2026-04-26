import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AddExpensePopup from "./screens/Addpopup";
import SetBudget from "./screens/SetBudget";
import { useCookies } from "react-cookie";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import Myexpense from "./screens/Myexpense";
import 'react-toastify/dist/ReactToastify.css';
import LoginSignupPage from "./screens/LoginSignup";
import SideDrawer from "./components/SideDrawer";
import PageTransition from "./components/PageTransition";

function RouteApp() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeMonth, setActiveMonth] = useState(moment().toISOString());

  const handleDataRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Conditionally render the side drawer based on the current route
  const renderSideDrawer = () => {
    if (location.pathname === "/login" || location.pathname === "/") {
      return null; // Don't render side drawer on login page
    }
    return <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />;
  };

  var div_class = isDrawerOpen ? "my-1.5  bg-gray-50  rounded-tl-3xl rounded-bl-3xl px-4 py-4   w-full overflow-y-auto" : " bg-gray-50   px-4 py-4   w-full overflow-y-auto";
  return (
    <div className="flex" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)' }}>
      {renderSideDrawer()}
      <div className={div_class}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<LoginSignupPage />} />
            <Route path="login" element={<LoginSignupPage />} />
            <Route path="dashboard" element={<App key={refreshKey} activeMonth={activeMonth} />} />
            <Route path="myExpense" element={<Myexpense key={refreshKey} activeMonth={activeMonth} setActiveMonth={setActiveMonth} />} />
            <Route path="addExpense" element={<AddExpensePopup onExpenseAdded={handleDataRefresh} />} />
            <Route path="setBudget" element={<SetBudget onBudgetSet={handleDataRefresh} />} />
          </Routes>
        </PageTransition>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
