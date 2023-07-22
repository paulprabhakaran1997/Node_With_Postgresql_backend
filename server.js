const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const pool = require('./database/database.js')

dotenv.config();
app.use(express.json());
app.use(cors());


// GET ALL USERS


app.get('/users' , (req , res) =>{
    const getUserQry = `SELECT * from accounts;`;
    pool.query(getUserQry)
        .then(response =>{
            if(!response.error){
                console.log("GET REsponse - ",response);
                res.json({message : 'Success' , data : response.rows})
            }
        })
        .catch(err =>{
            console.log(err);
            res.json({message : 'Error' , data : err})
        })
});


// GET USERS BY ID


app.get('/users/:id' , (req , res) =>{
    const getUserQry = `SELECT * from accounts where user_id=${req.params.id} ;`;
    pool.query(getUserQry)
        .then(response =>{
            if(!response.error){
                console.log("GET REsponse - ",response);
                res.json({message : 'Success' , data : response.rows})
            }
        })
        .catch(err =>{
            console.log(err);
            res.json({message : 'Error' , data : err})
        })
});


// UPDATE USER BY ID

app.put('/users/:id' , (req , res) =>{
    const updateUserQry = `UPDATE accounts set username = '${req.body.username}', password = '${req.body.password}' where user_id = ${req.params.id} ;`;
    pool.query(updateUserQry)
        .then(response =>{
            if(!response.error){
                console.log("UPDATE REsponse - ",response);
                res.json({message : 'Success' , data : response.rows})
            }
        })
        .catch(err =>{
            console.log(err);
            res.json({message : 'Error' , data : err})
        })
});





// ADD NEW USERS


app.post('/adduser' , (req , res) =>{
    const username = req.body.username;
    const password = req.body.password;

    console.log("USERNAME : ",username);
    console.log("PASSWORD : ",password);

    const insertQry = `INSERT INTO accounts ( username, password ) VALUES ( '${username}', '${password}' );`

    pool
        .query(insertQry)
        .then(response =>{
            console.log("Value Added");
            console.log("RES = ",response);
            res.json({message : "Data Saved Successfully" , data : response})
        })
        .catch(err =>{
            console.log(err);
            res.json({message : "Error" , data : err})
        })

    

})



// DELETE USER

app.delete('/users/:id' , (req , res) =>{
    const getUserQry = `DELETE from accounts where user_id=${req.params.id} ;`;
    pool.query(getUserQry)
        .then(response =>{
            if(!response.error){
                console.log("DELETE REsponse - ",response);
                res.json({message : 'Success' , data : response.rows})
            }
        })
        .catch(err =>{
            console.log(err);
            res.json({message : 'Error' , data : err})
        })
});



app.listen(process.env.PORT , () => console.log(`Server Running on Port ${process.env.PORT}`))