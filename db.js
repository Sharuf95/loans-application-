const sqlite3 = require("sqlite3").verbose();

// To connect database we need to open connection

const db = new sqlite3.Database("./loans.db",(error) => {
if(error){
console.log("Unbale to connect DB")
}else{
console.log("DB Connected")
}
});


module.exports = db;


/*db.serialize(function() {

 // Get all apllication from the loans table 
// Select * from loans;

db.each('SELECT * from loans',(error,dbRow) => {
console.log(":: ERROR ::",error)
console.log(":: DB ROW ::",dbRow);
})

db.all(`SELECT * from loans`,function () {
console.log("ALL ROWS",rows);
})
})*/
