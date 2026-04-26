// const SERVER_URL = 'https://expensetracker-2ru5.onrender.com/api/';

const SERVER_URL = "https://spendly-backend-fnsb.onrender.com/api/";
const fetchWithPost = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error.message);
  }
};

export const createUser = async (username, email, password) => {
  return await fetchWithPost(`${SERVER_URL}createUser`, { username: username, email: email, password: password });
};

export const loadUser = async (userId) => {
  return await fetchWithPost(`${SERVER_URL}loadUser`, { id: userId });
};

export const loginUser = async (email, password) => {
  return await fetchWithPost(`${SERVER_URL}loginUser`, { email: email, password: password });
};

export const updateBudget = async (userId, monthlyBudget, categoryBudgets) => {
  return await fetchWithPost(`${SERVER_URL}updateBudget`, {
    id: userId,
    monthlyBudget: monthlyBudget,
    categoryBudgets: categoryBudgets,
  });
};

export const loadStats = async (userId, activeMonth) => {
  return await fetchWithPost(`${SERVER_URL}loadStats`, { id: userId, date: activeMonth });
};

export const createExpense = async (
  name,
  amount,
  description,
  category,
  userId
) => {
  return await fetchWithPost(`${SERVER_URL}addExpense`, {
    name: name,
    amount: amount,
    description: description,
    category: category,
    currencyType: "INR",
    user: userId,
  });
};

export const getExpensesByUser = async (userId, date) => {
  return await fetchWithPost(`${SERVER_URL}loadExpenses`, {
    id: userId,
    date: date,
  });
};
