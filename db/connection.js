const mysql = require("mysql2")
const connection = mysql.createConnection({
    host:"localhost", 
    user:"root",
    password:"Pass1234",
    database:"employeedb"
})

connection.connect(function (err){
    if (err) throw err
})

module.exports = connection 