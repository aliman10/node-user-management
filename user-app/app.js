require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const UserRoute = require('./routes')

app.use('/user',UserRoute)


app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});