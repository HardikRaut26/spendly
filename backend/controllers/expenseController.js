const Expense = require('../models/expenseModel');

const User = require('../models/userModel');

// Create a new expense
exports.createExpense = async (req, res) => {
    try {
        const newExpense = await Expense.create(req.body);

        // Find the user and add the new expense to their expenses array
        const user = await User.findById(newExpense.user);
        if (user) {
            user.expenses.push(newExpense._id);
            await user.save();
        }

        res.status(201).json({
            status: 'success',
            data: newExpense
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};


exports.getExpensesByUser = async (req, res) => {
    try {
   
        const { id } = req.body;

        // Find all expenses for the user, sorted by most recent
        const expenses = await Expense.find({ user: id }).sort({ date: -1 });



        res.status(200).json({
            status: 'success',
            data: expenses
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

