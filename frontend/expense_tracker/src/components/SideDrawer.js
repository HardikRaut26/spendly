import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadUser } from "../Api";
import { useCookies } from "react-cookie";
import {
  faTachometerAlt,
  faMoneyBillWave,
  faPlusCircle,
  faChartLine,
  faSignOut,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SideDrawer = ({ isOpen, onClose }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userId, setUserId] = useState(cookies.userId);

  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const loadUserProfile = async () => {
    console.log("Loading user...");
    try {
      const response = await loadUser(userId);
      setUser(response.data);
      console.log("User:", response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleLogout = () => {
    removeCookie("userId");
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if (!user) {
      loadUserProfile();
    }
  }, [userId]);

  // Function to get the initials from the name
  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.slice(0, 2).join("").toUpperCase();
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/dashBoard", icon: faTachometerAlt, label: "Dashboard" },
    { path: "/myExpense", icon: faMoneyBillWave, label: "My Expenses" },
    { path: "/addExpense", icon: faPlusCircle, label: "Add Expense" },
    { path: "/setBudget", icon: faChartLine, label: "Set Budget" },
  ];

  return (
    <div
      className={`flex flex-col justify-between h-screen px-4 py-6 transition-all duration-300 ${
        isOpen ? "w-80" : "w-12"
      }`}
      style={{ background: 'linear-gradient(180deg, #4f46e5 0%, #6d28d9 100%)' }}
    >
      <div className="flex items-center justify-between">
        <h4 className={`text-white text-xl font-bold tracking-tight ${isOpen ? "" : "hidden"}`}>
          <span style={{ background: 'linear-gradient(135deg, #e0e7ff, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>💸 Spendly</span>
        </h4>
        <button onClick={onClose} className="text-white/80 hover:text-white focus:outline-none cursor-pointer transition-colors">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className={`flex flex-col flex-grow mt-8 ${isOpen ? "" : "hidden"}`}>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`py-2.5 px-3 rounded-xl cursor-pointer transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-white/20 text-white font-semibold shadow-lg backdrop-blur-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => navigate(item.path, { replace: true })}
            >
              <FontAwesomeIcon className="pr-3 w-5" icon={item.icon} /> {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className={`border-t border-white/20 mb-4 ${isOpen ? "" : "hidden"}`}></div>
        <div className={`flex items-center text-white ${isOpen ? "" : "hidden"}`}>
          <div className="h-10 w-10 rounded-full flex justify-center items-center font-semibold text-sm"
               style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)' }}>
            {getInitials(user == null ? "" : user.username)}
          </div>
          <span className="ml-3 text-sm">
            <div className="font-medium text-white">{user?.username}</div>
            <div className="text-white/50 text-xs">{user?.email}</div>
          </span>
        </div>
        <div
          className={`text-sm pt-4 text-white/60 flex justify-between cursor-pointer hover:text-white transition-colors ${isOpen ? "" : "hidden"}`}
          onClick={() => handleLogout()}
        >
          Logout <FontAwesomeIcon className="pt-0.5" icon={faSignOut} />
        </div>
        <div
          className={`pt-2 text-white/30 flex justify-between ${isOpen ? "" : "hidden"}`}
          style={{ fontSize: "7px" }}
        >
          &copy; 2025 Hardik Raut. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
