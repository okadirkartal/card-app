const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.log("Can not connect to database!", err);
    process.exit();
  });

mongoose.set('strictQuery', true);

const cardRoutes = require('./routes/card');

const app = express();

var corsOptions = {
  origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', cardRoutes);


const port = process.env.port || 8080;
app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
