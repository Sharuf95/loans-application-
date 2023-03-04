const express = require("express");
const bodyParser = require ("body-parser");
const db = require ("./db.js");
// Creating an express application 
const app = express ();

// handling json body request 
app.use(bodyParser.json());

app.get ("/",function(request,response) {
response.json({
status  : true,
message : "Loans API running successfull"
});                  
});


// Get all loan applications

app.get('/loans',function(request,response){

db.serialize(() => {
db.all(`SELECT * from loans`,(error,rows) => {
 if(error){
response.json({
status : false,
error : error
})
 }else {
response.json({
status : true,
loans : rows
})
}})
})
}
)
                    










// post API for new loan application 

app.post("/new-loan",function(request,response) {
const loandata = request.body

/*
 const firstName = loandata.firstName;
 const lastName  = loandata.lastName;
 const email     = loandata.email;
 const amount    = loandata.amount;
 const purpose   = loandata.purpose*/
 
 // You can do same thing using destructring object ( we can do like this also)

 const {firstName,lastName,email,amount,purpose} = loandata;

if(!firstName) {
// return response.status(400).json({
// status : false,
// error : `firstName is required`
// })
return SendErrorResponse(response,`firstName is required`)
};

if(!lastName) {
// return response.status(400).json({
//status : false,
//error : `lastName is required`
// })
return SendErrorResponse(response,`lastName is required`)
};

if(!email){
//return response.status(400).json({
//status : false,
//error : `Email address is required`
// })
return SendErrorResponse(response,`Email address is required`)
};


if(!amount){
// return response.status(400).json({
//status : false,
//error : `Please provide loan amount`
//}) 
return  SendErrorResponse(response,`Please provide loan amount`)
};

if(!purpose){
//return response.status(400).json({
// status : false,
// error : `Purpose for loan is required`
// })
return SendErrorResponse(response,`Please provide loan amount`)
}


return response.json({
status  : true,
message : "New loan application created....",
data    : loandata
})
})


function SendErrorResponse(response,ErrorMessage) {
return response.status(400).json({
status : false,
error  : ErrorMessage
});
}


app.listen(4001,function(request,response) {
console.log(`Server is running on  http://localhost:4001`)
}) 