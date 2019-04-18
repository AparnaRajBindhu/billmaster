var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expense_tracker"
    
    /*host: "us-cdbr-iron-east-02.cleardb.net",
    user: "b5ebd2674d719d",
    password:"c359b5cf",
    database:"heroku_f652ba62f3da7bb"*/
    
});
console.log("In connection.js");

con.connect(function(err) {
  if (err){
		console.log("Connection error", err);
  }else{
	  console.log("Connected to MySQL database!! hello");
  } 
});

module.exports = con;