const User = require('../models/userModel');
const Expense = require('../models/expenseModel');
const mongoose = require('mongoose');
const moment = require('moment');

const expenseCategories = [
    "Food & Dining",
    "Housing",
    "Transportation",
    "Healthcare",
    "Entertainment",
    "Utilities",
    "Personal Care",
    "Others"
];

exports.createUser = async (req, res) => {
    try {
        console.log('Creating user with data:', req.body);
        const newUser = await User.create(req.body);
        console.log('User created successfully:', newUser);
        res.status(200).json({
            status: 'success',
            data: newUser
        });
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.loadUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        if (!user) {    
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {    
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.updateBudget = async (req, res) => {
    try {
        console.log('Updating budget with data:', req.body);
        const { id, monthlyBudget, categoryBudgets } = req.body;

        const user = await User.findById(id);

        if (!user) {    
            console.error('User not found for budget update:', id);
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        user.monthlyBudget = monthlyBudget;
        if (categoryBudgets) {
            user.categoryBudgets = categoryBudgets;
        }
        
        const updatedUser = await user.save();
        console.log('Budget updated successfully:', updatedUser);

        res.status(200).json({
            status: 'success',
            data: updatedUser
        });
    } catch (err) {
        console.error('Error updating budget:', err.message);
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};



exports.loadStats = async (req, res) => {
    try {
        const { id: userId, date } = req.body;
        console.log(`[DEBUG] 1. Received request for stats. UserID: ${userId}, Date: ${date}`);

        if (!userId || !date) {
            console.error('[DEBUG] ERROR: Missing userId or date in request body.');
            return res.status(400).json({ status: 'error', message: 'Missing userId or date' });
        }

        const currentMonthStart = moment(date).startOf('month').toDate();
        const currentMonthEnd = moment(date).endOf('month').toDate();
        console.log(`[DEBUG] 2. Calculated date range. Start: ${currentMonthStart.toISOString()}, End: ${currentMonthEnd.toISOString()}`);

        const query = {
            user: new mongoose.Types.ObjectId(userId),
            date: { $gte: currentMonthStart, $lte: currentMonthEnd }
        };
        console.log('[DEBUG] 3. Executing database query:', JSON.stringify(query, null, 2));

        const currentMonthExpenses = await Expense.find(query);
        console.log(`[DEBUG] 4. Query finished. Found ${currentMonthExpenses.length} expenses.`);

        // Calculate total monthly spend
        let totalMonthlySpend = 0;
        for (const expense of currentMonthExpenses) {
            totalMonthlySpend += expense.amount;
        }

        // Calculate total spends in each category for the current month
        const categorySpends = {};
        for (const category of expenseCategories) {
            let categoryTotal = 0;
            for (const expense of currentMonthExpenses) {
                if (expense.category === category) {
                    categoryTotal += expense.amount;
                }
            }
            categorySpends[category] = categoryTotal;
        }

        // Calculate total spend all time
        let totalSpendAllTime = 0;
        const allTimeExpenses = await Expense.find({ user: userId });
        for (const expense of allTimeExpenses) {
            totalSpendAllTime += expense.amount;
        }

        // Get the monthly budget from the User collection
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found for stats loading:', userId);
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        const monthlyBudget = user.monthlyBudget || 0;
        const categoryBudgets = user.categoryBudgets || {};

        const statsData = {
            totalMonthlySpend,
            categorySpends,
            totalSpendAllTime,
            monthlyBudget,
            categoryBudgets
        };

        console.log('Stats loaded successfully:', statsData);

        res.status(200).json({
            status: 'success',
            data: statsData
        });
    } catch (err) {
        console.error('Error loading stats:', err.message);
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};
