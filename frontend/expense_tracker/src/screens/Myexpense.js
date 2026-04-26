import React, { useEffect, useState } from "react";
import FilterSlider from "../components/filter/FilterSlider";
import { getExpensesByUser } from "../Api";
import moment from "moment";
import { useCookies } from "react-cookie";
import ChipSlider from "../components/chipfilter/chipSlider";
import ScrollReveal from "../components/ScrollReveal";

const Myexpense = ({ activeMonth, setActiveMonth }) => {
  const [cookies] = useCookies();
  const [activeTab, setActiveTab] = useState("All");
  const [userId] = useState(cookies.userId?._id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, activeMonth]);

  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (activeMonth) {
      fetchExpenses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <ScrollReveal animation="fade-up">
      <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
        <table className="w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/80">
            <tr>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
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
                  <tr key={expense._id} className="bg-white hover:bg-gray-50/50 transition-colors">
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
      </ScrollReveal>
    </div>
  );
};

export default Myexpense;
