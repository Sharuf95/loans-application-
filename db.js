const sqlite3 = require ("sqlite3").verbose();

// manam database browser lo em name tho aithe create loans.db ani create chesamo adaye name ni new sqlite3.Database ki connect chesthunam 
// loans.db anaye database file ni, db.js nundi operate chesthunam  next
// db.js ni index.js ki export chesthunam

/*const db = new sqlite3.Database("./loans.db", function (error) {
        if(error) {
                console.error(error)   ========>>>> This will also work just ekada functionality change chesam anthe
        }
        console.log("DATABASE CONNECTED.....")
})*/

// To connect database we need to open connection

const db = new sqlite3.Database("./loans.db",(error) => {
        if (error) {
                console.log("Unable to connect Database")
        }else {
                console.log("DATABASE CONNECTED.....")
        }
});

module.exports = db;    // Im exporting this db to index.js

/* Im exporting this db to index.js
db.serialize (function () {
        // Get All applications from the loans table
        //SELECT * from loans
        
        db.each(`SELECT * from loans`,(error,rows) => {
              // SELECT firstName,email,purpose from loans apudu manaki anni single & separate ga output osthundi  
                console.log(":: ERROR  ::",error)
                console.log(":: DB ROW ::",rows)
    });

db.all(`SELECT * from loans`,function(error,rows) {
        console.log(`All rows`,rows); // All rows anayedi console message
       
   })

});*/

/* 
dblite lo open database ni open chesina tharvathaye manam INSERT INTO loans lo values enter chesake manam data ni add cheyagalam...! 
Ee data ni manam database (loans.db) anaye file nundi testhunam...!

OUTPUT :-
DATABASE CONNECTED.....
:: ERROR  :: null
:: DB ROW :: {
  loan_id: 1,
  firstName: 'Shaik',
  lastName: 'Sharuf',
  email: 'Shaik.sharuf.me',
  loan_amount: 20000,
  purpose: 'personal',
  status: 'PENDING'
},
:: ERROR  :: null
:: DB ROW :: {
  loan_id: 2,
  firstName: 'Shahida',
  lastName: 'Shaik',
  email: 'Shahida.Shaik',
  loan_amount: 25000,
  purpose: 'college fee',
  status: 'PENDING'
}
:: ERROR  :: null
:: DB ROW :: {
  loan_id: 3,
  firstName: 'yesh',
  lastName: 'Shaik',
  email: 'yesh09.me',
  loan_amount: 15000,
  purpose: 'Mobile',
  status: 'PENDING'
}
All rows [
  {
    loan_id: 1,
    firstName: 'Shaik',
    lastName: 'Sharuf',
    email: 'Shaik.sharuf.me',
    loan_amount: 20000,
    purpose: 'personal',
    status: 'PENDING'
  },
  {
    loan_id: 2,
    firstName: 'Shahida',
    lastName: 'Shaik',
    email: 'Shahida.Shaik',
    loan_amount: 25000,
    purpose: 'college fee',
    status: 'PENDING'
  },
  {
    loan_id: 3,
    firstName: 'yesh',
    lastName: 'Shaik',
    email: 'yesh09.me',
    loan_amount: 15000,
    purpose: 'Mobile',
    status: 'PENDING'
  }
]*/
