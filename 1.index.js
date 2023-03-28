const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3")

// db ni db.js ki connect chesina tharvatha aa db.js ni ekada import chesthunam
const db = require ("./db.js");
// express app ni database ki connect cheyadaniki  **const sqlite3 = require("sqlite3");**  ee library ni use chestham
// database related files anni verey file lo create chesthunam  
// Creating an express application 
const app = express();

// Handling json body request 
app.use(bodyParser.json());

app.get('/',function (request,response) {
        response.json({
                status  : true,
                message : "Loan API running successfull" 
        })
})

// Get all loans applications
app.get("/loans",function (request,response) {

 db.serialize(function () {
   const Selectquery = `SELECT * from loans`
   db.all( Selectquery,(error,rows) => {
     if(error) {
       response.json({
         status   : false,
           error : error
             })
               }else {
                 response.json ({
                  status   : true,
                   loans   : rows
                })
             }
         })
     })
})



// Post API for new loan
// POST Api lo, manam postman lo insert chesina data ni tharvatha vs code lo request body handle cheyali,anduke const loandata = request.body
app.post('/new-loan',function (request,response) {
        const loandata = request.body

// const firstName = loandata.firstName;
// const lastName  = loandata.lastName;
// const email     = loandata.email; ====>> This is one way
// const purpose   = loandata.purpose;
// const amount    = loandata.amount;


const {firstName,lastName,email,purpose,amount} = loandata


if (!firstName) {
            // return response.status(400).json({
           //     status : "false",
          //    message : "Please Provide firstName"}) 
                return Send_Error_Message (response,"Please Provide firstName")
}
if (!lastName) {
          // return response.status(400).json({
         //  status : "false",
        //message : "Please Provide lastName"})
        return Send_Error_Message (response,"Please Provide lastName")
}

 if(!email) {
 return  Send_Error_Message (response,"Please Provide email")
 };

 if(!purpose) {
 return  Send_Error_Message (response,"Please mention amount")
 };

 if(!amount) {
 return Send_Error_Message (response,"Please provide purpose Information")
 }

 const InsertSql = `INSERT INTO loans(
        firstName,
  lastName,
  email,
  loan_amount,
  purpose
) VALUES (
 "${firstName}",
 "${lastName}",
 "${email}",
 "${amount}",
 "${purpose}"
)`;

 db.serialize(() => {
   db.exec(InsertSql,(error) => {
     if(error){
       response.status(400).json({
         status   : false,
           error : error
             })
              }else {
                response.json({
                  status           : "true",
                   message         : "New loan Application Created....",
                     data          : loandata,
                      InsertingSql : InsertSql
                      });   
                    }
                  })
                })  
             });

 app.get(`/loans/:id`, function (request,response) {
 const loan_id = request.params.id;
 //  const selectquery = `SELECT loan_id,firstName,lastName,loan_amount,purpose,status from loans`
 const sql = `SELECT * from loans WHERE loan_id = ${loan_id}`;

 db.serialize( () => {
   db.get(sql,(error,rows) => {
      if (error || !rows) {
        response.status(400).json({
          status : false,
           error : `Unable to find loan_id with : ${loan_id} `
             })
               }else {
                    for(let i = 0; i < rows.length;i++){
                    delete rows[i].email
                    }

                    let index = 0 
                    while(index < rows.length){
                    delete rows[index].purpose;
                    index++
                    }
                    // we can use this three methods to access array     1.for loop,    2.while loop,    3.forEach method
                    /*row.forEach((singlerow) => {
                    delete singlerow.lastName
                    })*/ 

                   response.json({
                   status : true,
                     loan : rows
                      });
                    };
                 });
               });
            });  

        /*response.json({
        status : true,
        loan_id,
        //loan_id : loan_id,  ===> whether same keys & values are same for example [ loan_id : loan_id ] then we can write loan_id.
        })*/

 app.post('/loans/:id',function (request,response) {
        const loan_id = request.params.id;
        const requestBody = request.body;
        const status = requestBody.status;

 // Update QUERY ====> UPDATE loans SET status = "Approved" WHERE loan_id = 4;
 // manam mana database lo update query ni update chesthaye nay manam mana query ni run cheyagalam 
 // manam database ni close chesthaye nay mana api work avthundi lekapothaye work avadhu
        const Sql      = `UPDATE loans
        SET status     = "${status}"
        WHERE loan_id = ${loan_id}`;

 db.serialize(function () {
   db.exec(Sql,(error) => {
     console.log(error);
       if (error) {
         response.status(400).json ({
           status    : false,
             Sql,
               error : `Error while Updating the loan for id : ${loan_id}`
                })
                  }else{
                   response.json ({
                     status    : true,
                       message : "Loan details Updated"
                       });
                     };
                   });
                 });
              });


        /*response.json({
                status : true,
                loan_id : loan_id,
                loan_status : status
        })*/



  
     
 
                  
 function Send_Error_Message (response,errormessage) {
        return response.json({
         status : "false",
         error  : errormessage
   });
};


 app.listen(3000,function () {
        console.log(`Server is running on http://localhost:3000`);
})