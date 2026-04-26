import React, { useState } from "react";
import SideDrawer from "../components/SideDrawer";
import { createExpense } from "../Api";
import { toast } from "react-toastify";
import {useCookies} from 'react-cookie';

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
      toast.success("Expense Added Successfully! 💰", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setName("");
      setAmount("");
      setDescription("");
      setCategory("");
    });
  };


  return (
    <div >
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border rounded w-full py-2 px-3 bg-gray-50"
              type="text"
              id="name"
              placeholder="Enter Expense Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              className="border rounded w-full py-2 px-3 bg-gray-50"
              type="number"
              id="amount"
              placeholder="Enter Expense Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="border rounded w-full py-2 px-3 h-36 resize-none bg-gray-50"
              id="description"
              placeholder="Enter Expense Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="border rounded w-full py-2 px-3 bg-gray-50"
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
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>

  );
};

export default AddExpensePopup;
