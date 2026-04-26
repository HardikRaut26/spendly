import React, { useState } from "react";
import SideDrawer from "../components/SideDrawer";
import { createExpense } from "../Api";
import { toast } from "react-toastify";
import {useCookies} from 'react-cookie';
import ScrollReveal from "../components/ScrollReveal";

const AddExpensePopup = ({ onExpenseAdded }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userId, setUserId] = useState(cookies.userId);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isSideDrawerOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    createExpense(name, amount, description, category, userId).then(() => {
      if (onExpenseAdded) {
        onExpenseAdded();
      }
      toast.success("Expense Added Successfully! 💰");
      setName("");
      setAmount("");
      setDescription("");
      setCategory("");
    });
  };


  return (
    <div >
        <ScrollReveal animation="fade-up">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Add Expense</h2>
        </ScrollReveal>
        <form onSubmit={handleSubmit}>
          <ScrollReveal animation="fade-up" stagger={0}>
          <div className="mb-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100/80">
            <label
              className="block text-gray-700 font-semibold mb-2 text-sm"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border border-gray-200 rounded-xl w-full py-2.5 px-3 bg-gray-50/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              type="text"
              id="name"
              placeholder="Enter Expense Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" stagger={1}>
          <div className="mb-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100/80">
            <label
              className="block text-gray-700 font-semibold mb-2 text-sm"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              className="border border-gray-200 rounded-xl w-full py-2.5 px-3 bg-gray-50/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              type="number"
              id="amount"
              placeholder="Enter Expense Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          </ScrollReveal>
          <div className="mb-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100/80">
            <label
              className="block text-gray-700 font-semibold mb-2 text-sm"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="border border-gray-200 rounded-xl w-full py-2.5 px-3 h-36 resize-none bg-gray-50/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              id="description"
              placeholder="Enter Expense Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100/80">
            <label
              className="block text-gray-700 font-semibold mb-2 text-sm"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="border border-gray-200 rounded-xl w-full py-2.5 px-3 bg-gray-50/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Expense Category</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-2.5 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>

  );
};

export default AddExpensePopup;
