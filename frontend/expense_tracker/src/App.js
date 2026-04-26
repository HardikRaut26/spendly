import React, { useState, useEffect } from "react";
import CategoryCard from "./components/CategoryCard";
import TotalCard from "./components/TotalCard";
import SideDrawer from "./components/SideDrawer";
import { PieChart } from "@mui/x-charts/PieChart";
import { useCookies } from "react-cookie";
import moment from "moment";

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
import { loadStats, getExpensesByUser, loginUser } from "./Api.js";
import DashboardExpenseCard from "./components/DashboardExpenseCard.js";
import MyPieChart from "./components/MyPieChart.js";

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

const App = ({ activeMonth }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userId, setUserId] = useState(cookies.userId?._id);

  const [stats, setStats] = useState(null);
  const [expenses, setExpenses] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await loadStats(userId, activeMonth);
      console.log("Response:", response);
      setStats(response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await getExpensesByUser(userId, activeMonth);

      // Sort expenses by date in descending order (newest first)
      const sortedExpenses = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

      const firstFourExpenses = isMobile? sortedExpenses.slice(0, 2): sortedExpenses.slice(0, 4) ;
      setExpenses(firstFourExpenses);
      console.log("Expenses:", response.data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStats();
      fetchExpenses();
    }
  }, [userId, activeMonth]);

  const isMobile = window.innerWidth <= 768; 
  return (
    <div className="container">
      <h1 className="text-xl mb-3 mt-4 font-bold text-gray-800">
        Dashboard
      </h1>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-between">
        <TotalCard
          spends={stats?.totalMonthlySpend}
          totalBudget={stats?.monthlyBudget}
          allTotalSpends={stats?.totalSpendAllTime}
        />
        <div className="bg-white shadow-sm hover:shadow-md rounded-2xl p-0 flex-grow h-56 my-2 md:my-0.5 flex justify-center transition-shadow duration-200 border border-gray-100/80">
          {/* <PieChart

            series={[
              {
                data: [
                  {
                    id: 0,
                    value:
                      (stats?.categorySpends["Food & Dining"] /
                        stats?.totalMonthlySpend) *
                      100,
                    label: "Food & Dining",
                  },
                  {
                    id: 1,
                    value:
                      (stats?.categorySpends["Housing"] /
                        stats?.totalMonthlySpend) *
                      100,
                    label: "Housing",
                  },
                  {
                    id: 2,
                    value:
                      (stats?.categorySpends["Transportation"] /
                        stats?.totalMonthlySpend) *
                      100,
                    label: "Transportation",
                  },
                  {
                    id: 3,
                    value:
                      (stats?.categorySpends["Healthcare"] /
                        stats?.totalMonthlySpend) *
                      100,
                    label: "Healthcare",
                  },
                  {
                    id: 4,
                    value:
                      (stats?.categorySpends["Entertainment"] /
                        stats?.totalMonthlySpend) *
                      100,
                    label: "Entertainment",
                  },
                  {
                    id: 5,
                    value:
                      (stats?.categorySpends["Utilities"] /
                        stats?.totalMonthlySpend) *
                      100,
                    label: "Utilities",
                  },
                  {
                    id: 6,
                    value:
                      (stats?.categorySpends["Personal Care"] /
                        stats?.totalMonthlySpend) *
                      100,
                    label: "Personal Care",
                  },
                  {
                    id: 7,
                    value:
                      (stats?.categorySpends["Others"] /
                        stats?.totalMonthlySpend) *
                      100,
                    label: "Others",
                  },
                ],

                innerRadius: 30,
                paddingAngle: 1,
                cornerRadius: 5,
              },
            ]} */}
            <MyPieChart stats={stats}
          />
        </div>
      </div>
      <h1 className="text-xl mb-3 mt-6 font-bold text-gray-800">
        Recent Expenses
      </h1>
      <div className="flex justify-between overflow-x-auto">
        {expenses?.map((expense) => (
          <DashboardExpenseCard
            key={expense._id}
            name={expense.name}
            amount={expense.amount}
            category={expense.category}
            date={expense.date}
          />
        ))}
      </div>
      <h1 className="text-xl mb-3 mt-6 font-bold text-gray-800">
        Category Spendings
      </h1>
      <div className= {`flex justify-between overflow-x-auto ${isMobile ? "flex-col" : ""} `}>
  {stats?.categorySpends &&
    Object.entries(stats.categorySpends)
      .slice(0, 4)
      .map(([category, spends]) => (
        <CategoryCard
          key={category}
          category={category}
          icon={icons[category]}
          spends={spends}
          totalBudget={stats.categoryBudgets[category]}
        />
      ))}
</div>
<div className={`flex justify-between overflow-x-auto ${isMobile ? "flex-col" : ""} `}>
  {stats?.categorySpends &&
    Object.entries(stats.categorySpends)
      .slice(4, 8)
      .map(([category, spends]) => (
        <CategoryCard
          key={category}
          category={category}
          icon={icons[category]}
          spends={spends}
          totalBudget={stats.categoryBudgets[category]}
        />
      ))}
</div>

    </div>
  );
};

export default App;
