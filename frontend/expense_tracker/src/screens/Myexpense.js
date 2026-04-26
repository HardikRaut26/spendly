import React, { useEffect, useState } from "react";
import FilterSlider from "../components/filter/FilterSlider";
import SideDrawer from "../components/SideDrawer";
import { getExpensesByUser, loadStats } from "../Api";
import moment from "moment";
import { useCookies } from "react-cookie";
import ChipSlider from "../components/chipfilter/chipSlider";
import {
  faBathtub,
  faCheckCircle,
  faHospital,
  faHouse,
  faToolbox,
  faTrain,
  faUmbrellaBeach,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const icons = {
  "Food & Dining": faUtensils,
  Housing: faHouse,
  Transportation: faTrain,
  Healthcare: faHospital,
  Entertainment: faUmbrellaBeach,
  Utilities: faBathtub,
  "Personal Care": faCheckCircle,
  Others: faToolbox,
};

const colors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-lime-500",
  "bg-teal-500",
  "bg-amber-500",
  "bg-fuchsia-500",
  "bg-emerald-500",
  "bg-gray-500",
  "bg-orange-500",
];

const Myexpense = ({ activeMonth, setActiveMonth }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [activeTab, setActiveTab] = useState("All");
  const [userId, setUserId] = useState(cookies.userId?._id);
  const [expenses, setExpenses] = useState(null);




  const fetchExpenses = async () => {
    try {
      const response = await getExpensesByUser(userId, activeMonth);
      setExpenses(response.data);
      console.log("Expenses:", response.data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId, activeMonth]);

  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (activeMonth) {
      fetchExpenses();
    }
  }, [activeMonth]);

  return (
    <div>
      <ChipSlider activeMonth={activeMonth} setActiveMonth={setActiveMonth} />
      <div className="flex justify-start">
        <FilterSlider
          className="w-full"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="mt-4">
        <table className=" divide-y divide-gray-200 " style={{width:'90%'}}>
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses &&
              expenses
                .filter((expense) => {
                  return moment(expense.date).isSame(moment(activeMonth), 'month');
                })
                .filter((expense) => {
                  return activeTab === "All" || expense.category === activeTab;
                })
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((expense) => (
                  <tr key={expense._id} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {expense.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {expense.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ₹ {expense.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {expense.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myexpense;
