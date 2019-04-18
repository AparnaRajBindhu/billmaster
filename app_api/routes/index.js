var express = require('express');
var router = express.Router();
var ctrlExpense = require('../controllers/expense');


//get all expenses
router.get('/expenses', ctrlExpense.expenseList);

//get all category
router.get('/categories', ctrlExpense.categoryList);

//save item
router.post('/expense', ctrlExpense.expenseCreate);

//save category
router.post('/category', ctrlExpense.categoryCreate);

//update category
router.put('/category/:cat_id', ctrlExpense.categoryUpdate);

//delete category

router.delete('/category/:cat_id', ctrlExpense.categoryDelete);

//save user
router.post('/user', ctrlExpense.userCreate);

//update user
router.get('/user/:username/:pin', ctrlExpense.checkUser);

//delete item
router.delete('/expenses/:expense_id', ctrlExpense.expenseDelete);

//update item
router.put('/expense/:expenseId', ctrlExpense.expenseUpdate);


/* d3 routes */
router.get('/catspend', ctrlExpense.categorySpend);

router.get('/datespend/:from/:to', ctrlExpense.dateRangeSpend);

router.get('/todaysbills', ctrlExpense.todaysBills);

module.exports = router;
