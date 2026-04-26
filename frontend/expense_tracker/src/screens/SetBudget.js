import React, { useState, useEffect } from "react";
import { loadUser } from "../Api";
import { updateBudget } from "../Api";
import { toast } from "react-toastify";
import {useCookies} from 'react-cookie';
import ScrollReveal from "../components/ScrollReveal";

const MAX_BUDGET_PER_CATEGORY = 100000;

const clampBudgetValue = (value) =>
  Math.min(MAX_BUDGET_PER_CATEGORY, Math.max(0, value));

const formatINR = (value) => Number(value || 0).toLocaleString("en-IN");

const SetBudget = ({ onBudgetSet }) => {
  const [cookies] = useCookies();
  const [userId] = useState(cookies.userId);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      toast.success("Budget Updated Successfully! 💸");
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
        <ScrollReveal animation="fade-up">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Set Budget</h2>
          <p className="text-sm text-gray-400 mb-5">Use slider or type amount directly</p>
        </ScrollReveal>
        <div className={div_class}>
          {Object.entries(budgets).map(([category, value], index) => (
            <ScrollReveal key={category} animation="fade-up" stagger={index}>
            <div className="bg-white border border-gray-100/80 shadow-sm hover:shadow-md rounded-2xl p-5 transition-shadow duration-200">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-gray-800 font-semibold"
                  htmlFor={category}
                >
                  {category}
                </label>
                <span className="text-sm font-bold" style={{ color: '#6d28d9' }}>₹ {formatINR(value)}</span>
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
                  background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${
                    (value / MAX_BUDGET_PER_CATEGORY) * 100
                  }%, #e2e8f0 ${(value / MAX_BUDGET_PER_CATEGORY) * 100}%)`,
                  borderRadius: "999px",
                  outline: "none",
                  margin: "10px 0 6px 0",
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mb-3">
                <span>₹ 0</span>
                <span>₹ {formatINR(MAX_BUDGET_PER_CATEGORY)}</span>
              </div>
              <div>
                <label
                  className="block text-gray-500 text-xs uppercase tracking-wide mb-1 font-medium"
                  htmlFor={`${category}-input`}
                >
                  Amount
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 px-3">
                  <span className="text-gray-400 text-sm mr-2">₹</span>
                <input
                  id={`${category}-input`}
                  type="number"
                  min={0}
                  max={MAX_BUDGET_PER_CATEGORY}
                  value={value}
                  onChange={(e) =>
                    handleAmountInputChange(category, e.target.value)
                  }
                  className="w-full py-2.5 bg-transparent outline-none text-gray-800 focus:ring-0"
                />
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-5 mt-5 shadow-sm border border-gray-100/80 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            Total Monthly Budget: <span style={{ color: '#6d28d9' }}>₹ {formatINR(totalBudget)}</span>
          </h2>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
          >
            Set Budget
          </button>
        </div>
      </div>
   
  );
};

export default SetBudget;
