var mongoose = require('mongoose');
var connection = require('../models/connection');


//for GET requests
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

/*to get all expenses from database*/
module.exports.expenseList = function(req, res) {
	console.log("Listing all expenses:");
	
	connection.query("SELECT * FROM expense", function (err, result, fields) {
		console.log("Executing query");
		if (!result) {
			sendJsonResponse(res, 404, {
				"message": "You have no bills for now!!"
			});
			return;
		}else if(err){
			console.log(err);
			sendJsonResponse(res, 500, err);
		}else{
			sendJsonResponse(res, 200, result);
		}
	});
}; 

/* get categories*/
module.exports.categoryList = function(req, res) {
	console.log("Listing all categories:");
	connection.query("SELECT * FROM category", function (err, result, fields) {
		console.log("Executing query");
		if (!result) {
			sendJsonResponse(res, 404, {
				"message": "No Categories added!"
			});
			return;
		}else if(err){
			console.log(err);
			sendJsonResponse(res, 500, err);
		}else{
			sendJsonResponse(res, 200, result);
		}
	});
}

/* GET request for one expense item 
module.exports.expenseInfo = function(req, res) {
	console.log("req.params.expenseId: " + req.params.expenseId);
	if (req.params && req.params.expenseId) {
	var query = "SELECT * FROM expense WHERE expense_id = ?";
    var values = [req.params.expenseId];
    connection.query(query, values, function(err, result, fields) {
        if(!result){
            sendJsonResponse(res, 404, {
				"message": "Expense not found!"
			});
			return;
        }else if(err){
            console.log("Database Error");
            sendJsonResponse(res, 500, err);
            return;
        }else {
            sendJsonResponse(res, 200, foodItem);
        }
    });
    }else {
        console.log("No expense Id in request");
		sendJsonResponse(res, 400, {
			"message": "No expense id in request!"
		});
    }    
};*/

/* POST for create category */
module.exports.categoryCreate = function(req, res) {
	console.log("Create Category----", req.body);
	var sql = "INSERT INTO category (cat_name) VALUES (?)";
	var values = [req.body.category];

	connection.query(sql, values, function(err, result){
		console.log("Executing insert category..");
		if (err) {
			console.log("Error while saving:", err);
			sendJsonResponse(res, 400, err);
		} else {
			/*res.header({
				Location: req.protocol + '://' + req.get('host') + '/api/expense/' +  result.expense_id                       
			});*/
			sendJsonResponse(res, 201, result);
		}
	});
};

/*function to update category in list*/
module.exports.categoryUpdate = function(req, res) {
	var cat_id = req.params.cat_id;
	console.log("Update---",req.params.cat_id);
	if (cat_id) {
		var sql = "UPDATE category SET  cat_name = ? WHERE cat_id = ?";
		console.log(req.body);
		var values = [req.body.name,req.params.cat_id];
		connection.query(sql, values, function (err, result) {
			if (err) {
				console.log(err);
				sendJsonResponse(res, 500, {
					"message": "Error while saving"
			});
			} else {
				sendJsonResponse(res, 204, null);
			}
		});
	} else {
		sendJsonResponse(res, 400, {
			"message": "No cat_id in URL"
		});
	}
};

/*function to  delete category from database*/
module.exports.categoryDelete = function(req, res) {
	var cat_id = req.params.cat_id;
	console.log("Delete---",req.params.cat_id);
	if (cat_id) {
		  var sql = "DELETE FROM category WHERE cat_id = " + cat_id;
		  connection.query(sql, function (err, result) {
			console.log("Category to be deleted:");
				if(err){
					console.log("Delete Error in API:", err);
					sendJsonResponse(res, 500, err);
					return;
				}else{
                    console.log("Delete Success in API:");
                    console.log("Number of rows deleted: " + result.affectedRows);
                    sendJsonResponse(res, 204, null);
                }
				
			});
	}
	else {
		sendJsonResponse(res, 400, {
			"message": "No expense_id in URL"
		});
	}
};

module.exports.expenseCreate = function(req, res) {
	console.log("Create----", req.body);
	var sql = "INSERT INTO expense (username, expense_name, amount, expense_cat, expense_date, expense_desc) VALUES (?,?,?,?,?,?)";
	var values = ['User1', req.body.name, req.body.amount, req.body.category, req.body.date, req.body.desc];

	connection.query(sql, values, function(err, result){
		console.log("Executing insert");
		if (err) {
			console.log("Error while saving:", err);
			sendJsonResponse(res, 400, err);
		} else {
			/*res.header({
				Location: req.protocol + '://' + req.get('host') + '/api/expense/' +  result.expense_id                       
			});*/
			sendJsonResponse(res, 201, result);
		}
	});
};

/*function to  delete from database*/
module.exports.expenseDelete = function(req, res) {
	var expId = req.params.expense_id;
	console.log("Delete---",req.params.expense_id);
	if (expId) {
		  var sql = "DELETE FROM expense WHERE expense_id = " + expId;
		  connection.query(sql, function (err, result) {
			console.log("Expense to be deleted:");
				if(err){
					console.log("Delete Error in API:", err);
					sendJsonResponse(res, 500, err);
					return;
				}
				console.log("Delete Success in API:");
				console.log("Number of rows deleted: " + result.affectedRows);
				sendJsonResponse(res, 204, null);
			});
	}
	else {
		sendJsonResponse(res, 400, {
			"message": "No expense_id in URL"
		});
	}
};

/*function to update expense in list*/
module.exports.expenseUpdate = function(req, res) {
	var expenseId = req.params.expenseId;
	console.log("Update---",req.params.expenseId);
	if (expenseId) {
		var sql = "UPDATE expense SET  expense_desc = ?, amount = ?, expense_date = ? WHERE expense_id = ?";
		console.log(req.body);
		var values = [req.body.desc, req.body.amount, req.body.date, req.params.expenseId];
		connection.query(sql, values, function (err, result) {
			if (err) {
				console.log(err);
				sendJsonResponse(res, 500, {
					"message": "Error while saving"
			});
			} else {
				sendJsonResponse(res, 204, null);
			}
		});
	} else {
		sendJsonResponse(res, 400, {
			"message": "No expenseId in URL"
		});
	}
};

/*function to create new user in database*/

module.exports.userCreate = function(req, res) {
	console.log("Create----", req.body);
	var sql = "INSERT INTO user (username, pin, dob) VALUES (?,?,?)";
	var values = [req.body.newUsername, req.body.newPin1, req.body.dob];

	connection.query(sql, values, function(err, result){
		console.log("Executing insert");
		if (err) {
			console.log("Error while saving:", err);
			sendJsonResponse(res, 400, err);
		} else {
		
			sendJsonResponse(res, 201, result);
		}
	});
};


/*function to update userin list*/
module.exports.userPinUpdate = function(req, res) {
	var newPin = req.params.newPin;
	console.log("Update---",req.params.newPin);
	if (newPin) {
		var sql = "UPDATE user SET  pin = ? WHERE username = ? AND dob=?";
		console.log(req.body);
		var values = [req.body.pin,req.body.username,req.body.dob];
		connection.query(sql, values, function (err, result) {
			if (err) {
				console.log(err);
				sendJsonResponse(res, 500, {
					"message": "Error while saving"
			});
			} else {
				sendJsonResponse(res, 204, null);
			}
		});
	} else {
		sendJsonResponse(res, 400, {
			"message": "No userPin in URL"
		});
	}
};

// GET request for existing user 
module.exports.checkUser = function(req, res) {
	//console.log("req.params.oldUsername: " + req.params.oldUsername);
    console.log("req.body: " + JSON.stringify(req.params));
	if (req.params && req.params.username && req.params.pin) {
        //if(req.body.oldPin){
           var query = "SELECT * FROM user WHERE username = ? AND pin = ?";
           var values = [req.params.username,req.params.pin];
           console.log(values);
           connection.query(query, values, function(err, result, fields) {
            if(!result.length){
                console.log("not---"+result);
                sendJsonResponse(res, 404, {
                    "message": "User not found!"
                });
                return;
            }else if(err){
                console.log("Database Error");
                sendJsonResponse(res, 500, err);
                return;
            }else {
                console.log(result);
                sendJsonResponse(res, 200, result);
                return;
            }
            }); 
        /*}
        else {
            console.log("No pin in request");
            sendJsonResponse(res, 400, {
                "message": "No pin in request!"
            });
        } */
    }else {
        console.log("No username in request");
		sendJsonResponse(res, 400, {
			"message": "No username in request!"
		});
    }    
};

module.exports.categorySpend = function(req, res){
    var sql = "SELECT c.cat_name AS name, ROUND(SUM(e.amount)) AS total FROM expense e, category c WHERE e.expense_cat=c.cat_id GROUP BY e.expense_cat";
    connection.query(sql, function (err, result, fields) {
		console.log("Executing category spend");
		if (!result) {
			sendJsonResponse(res, 404, {
				"message": "No Data!"
			});
			return;
		}else if(err){
			console.log(err);
			sendJsonResponse(res, 500, err);
		}else{
			sendJsonResponse(res, 200, result);
		}
	});
};

module.exports.dateRangeSpend = function(req, res){
    var fromDate = req.params.from, toDate = req.params.to;
    console.log(fromDate, toDate);
    var sql = "SELECT expense_date AS date, amount FROM expense WHERE expense_date BETWEEN '" + fromDate + "' AND '" + toDate + "'";
    connection.query(sql, function (err, result, fields) {
        console.log("query", sql);
		console.log("Executing date range spend");
		if (!result) {
			sendJsonResponse(res, 404, {
				"message": "No Data!"
			});
			return;
		}else if(err){
			console.log(err);
			sendJsonResponse(res, 500, err);
		}else{
            console.log(result);
			sendJsonResponse(res, 200, result);
		}
	});
};

module.exports.todaysBills = function(req, res){
    var sql = "SELECT ROUND(SUM(amount),2) AS total FROM expense WHERE expense_date = CURRENT_DATE";
    
    connection.query(sql, function (err, result, fields) {
        console.log("query", sql);
		console.log("Executing todays spend");
		if (!result) {
			sendJsonResponse(res, 404, {
				"message": "No Data!"
			});
			return;
		}else if(err){
			console.log(err);
			sendJsonResponse(res, 500, err);
		}else{
            console.log(result);
			sendJsonResponse(res, 200, result);
		}
	});
};