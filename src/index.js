const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {db} = require('./model/dbConnection');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read
app.get('/api/readUser', (req, res) => {
    const sqlQuery = "SELECT * FROM users";

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

// create
app.post('/api/createUser', (req, res) => {
    const userFullname = req.body.fullname;
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.password;

    const sqlQuery = "INSERT INTO users (fullname, user_name, user_email, password) VALUE (?, ?, ?, ?)";
    db.query(sqlQuery, [userFullname, userName, userEmail, userPassword], (err, result) => {
       if (err) {
        console.log(err);
       } else {
        res.send(result);
        console.log(result);
       }
    });
});

// update
app.put('/api/updateUser', (req, res) => {
    const userFullname = req.body.fullname;
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.password;

    const sqlQuery = "UPDATE users SET fullname = ?, user_name = ?, user_email = ?, password = ? WHERE user_id";
    db.query(sqlQuery, [userFullname, userName, userEmail, userPassword], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

// delete
app.delete('/api/deleteUser', (req, res) => {
    const userId = req.body.user_id;

    const sqlQuery = "DELETE FROM users WHERE user_id = ?";
    db.query(sqlQuery, userId, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

app.listen(3001, () => {
    console.log(`server running in PORT 3001`);
});