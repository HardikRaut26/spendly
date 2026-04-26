<div align="center">

# 💸 Spendly

**Take control of your money. One expense at a time.**

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 About

Spendly is a full-stack expense tracking web app built with the **MERN stack**. It helps users track daily expenses, set category-wise budgets, and visualize spending patterns — all through a clean, intuitive interface.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure signup & login with session management |
| 📊 **Dashboard** | Overview of monthly spending with visual charts |
| 💳 **Expense Tracking** | Add, view, and filter expenses by category & month |
| 🎯 **Budget Management** | Set per-category budgets with interactive sliders |
| 📈 **Spend Analysis** | Category-wise breakdown and monthly trends |
| 🔔 **Toast Notifications** | Real-time feedback on all user actions |

---

## 🏗️ Project Structure

```
Spendly/
├── backend/
│   ├── controllers/       # Business logic
│   ├── models/            # Mongoose schemas (User, Expense)
│   ├── routes/            # API route definitions
│   ├── index.js           # Express server entry point
│   └── .env               # Environment variables
│
├── frontend/expense_tracker/
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── screens/       # Page-level components
│       ├── assets/        # Images & SVGs
│       ├── Api.js         # API service layer
│       └── index.js       # App entry point & routing
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/createUser` | Register a new user |
| `POST` | `/api/loginUser` | Authenticate user |
| `POST` | `/api/loadUser` | Fetch user profile |
| `POST` | `/api/updateBudget` | Update category budgets |
| `POST` | `/api/loadStats` | Get monthly spending stats |
| `POST` | `/api/addExpense` | Create a new expense |
| `POST` | `/api/loadExpenses` | Get expenses by user & month |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/HardikRaut26/spendly.git
cd Spendly
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5001
DB_CONNECTION_STRING=mongodb://localhost:27017/expense_tracker
```

Start the server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend/expense_tracker
npm install
npm start
```

The app will open at **http://localhost:3000** 🎉

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, Tailwind CSS, Chart.js, React Router |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Notifications** | React Toastify |
| **Icons** | Font Awesome |

---

## 📄 License

This project is open source.
