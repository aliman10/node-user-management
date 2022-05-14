require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');

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



app.use(express.static(__dirname + '/dist'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
