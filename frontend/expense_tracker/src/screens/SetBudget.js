import React, { useState, useEffect } from "react";
import { loadUser } from "../Api";
import SideDrawer from "../components/SideDrawer";
import { updateBudget } from "../Api";
import { toast } from "react-toastify";
import {useCookies} from 'react-cookie';

const MAX_BUDGET_PER_CATEGORY = 100000;

const clampBudgetValue = (value) =>
  Math.min(MAX_BUDGET_PER_CATEGORY, Math.max(0, value));

const formatINR = (value) => Number(value || 0).toLocaleString("en-IN");

const SetBudget = ({ onBudgetSet }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userId, setUserId] = useState(cookies.userId);

  const [totalBudget, setTotalBudget] = useState(0);
  const [user, setUser] = useState(null);
  const [budgets, setBudgets] = useState({
    "Food & Dining": 0,
    Housing: 0,
    Transportation: 0,
    Healthcare: 0,
    Entertainment: 0,
    Utilities: 0,
    "Personal Care": 0,
    Others: 0,
  });
  const [isSideDrawerOpen] = useState(true);

  const loadUserProfile = async () => {
    console.log("Loading user...");
    try {
      const response = await loadUser(userId);
      setUser(response.data);
      setBudgets(response.data.categoryBudgets);
      console.log("User:", response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      loadUserProfile();
    }
  }, [user]);

  const updateCategoryBudget = (category, rawValue) => {
    const parsedValue = Number(rawValue);
    const value = Number.isFinite(parsedValue)
      ? clampBudgetValue(parsedValue)
      : 0;

    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: value,
    }));
  };

  const handleSliderChange = (category, value) => {
    console.log("Slider changed:", category, value);
    updateCategoryBudget(category, value);
  };

  const handleAmountInputChange = (category, value) => {
    updateCategoryBudget(category, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudget(userId, totalBudget, budgets).then(() => {
      if (onBudgetSet) {
        onBudgetSet();
      }
      toast.success("Budget Updated Successfully! 💸 ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      console.log("Submitted Budgets:", budgets);
    });
  };

  useEffect(() => {
    setTotalBudget(
      budgets["Food & Dining"] +
        budgets.Housing +
        budgets.Transportation +
        budgets.Healthcare +
        budgets.Entertainment +
        budgets.Utilities +
        budgets["Personal Care"] +
        budgets.Others
    );
  }, [budgets]);

  const isMobile = window.innerWidth <= 768;
  const div_class = isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-5";
  return (
    <div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Set Budget</h2>
        <p className="text-sm text-gray-500 mb-4">Use slider or type amount directly</p>
        <div className={div_class}>
          {Object.entries(budgets).map(([category, value]) => (
            <div key={category} className="bg-white border border-gray-100 shadow-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-gray-800 font-semibold"
                  htmlFor={category}
                >
                  {category}
                </label>
                <span className="text-sm font-semibold text-blue-700">₹ {formatINR(value)}</span>
              </div>
              <input
                type="range"
                id={category}
                name={category}
                min={0}
                max={MAX_BUDGET_PER_CATEGORY}
                value={value}
                onChange={(e) =>
                  handleSliderChange(category, parseInt(e.target.value))
                }
                className="w-full slider"
                style={{
                  width: "100%",
                  height: "8px",
                  appearance: "none",
                  background: `linear-gradient(to right,  #3B82F6 0%,  #3B82F6 ${
                    (value / MAX_BUDGET_PER_CATEGORY) * 100
                  }%, #d3d3d3 ${(value / MAX_BUDGET_PER_CATEGORY) * 100}%`,
                  borderRadius: "999px",
                  outline: "none",
                  margin: "10px 0 6px 0",
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mb-3">
                <span>₹ 0</span>
                <span>₹ {formatINR(MAX_BUDGET_PER_CATEGORY)}</span>
              </div>
              <div>
                <label
                  className="block text-gray-600 text-xs uppercase tracking-wide mb-1"
                  htmlFor={`${category}-input`}
                >
                  Amount
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 px-2">
                  <span className="text-gray-500 text-sm mr-2">₹</span>
                <input
                  id={`${category}-input`}
                  type="number"
                  min={0}
                  max={MAX_BUDGET_PER_CATEGORY}
                  value={value}
                  onChange={(e) =>
                    handleAmountInputChange(category, e.target.value)
                  }
                  className="w-full py-2 bg-transparent outline-none text-gray-800"
                />
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-lg font-semibold mt-5 text-gray-800">
          Total Monthly Budget: ₹ {formatINR(totalBudget)}
        </h2>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg font-medium"
          >
            Set Budget
          </button>
        </div>
      </div>
   
  );
};

export default SetBudget;
