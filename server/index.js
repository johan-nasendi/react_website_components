const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_web_react'
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post("/api/insert", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const sqlInsert = " INSERT INTO users (name, email, password) VALUES (?,?,?)";
    db.query(sqlInsert, [name, email, password], (err, resulf) => {
        console.log(err);
    });
});


app.post("/api/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
   db.query(
       "SELECT * FROM users WHERE email = ? AND password = ?",
       [email, password],
       (err, masuk) => {
           if(err) {
               res.send({err: err});
           }

           if(masuk.length > 0) {
               res.send(masuk);
           } else {
               res.send({ message: "wrong Email/Passwors Combination"});
           }
       }
   );
});





app.listen(3001, () => {
    console.log("Good Running Port 3001")
})