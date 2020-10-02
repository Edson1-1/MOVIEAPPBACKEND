const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const upload = require('express-fileupload');
// const { config } = require('dotenv/types');

//routes
const userRoute = require('./routes/user.js');
const sampleRoute = require('./routes/sampleroute.js');
const movieRoute = require('./routes/movie.js');

//environment variable
require('dotenv').config();


const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(upload());
app.use(express.static('public'));

//Routes middleware
app.use('/api/user', userRoute);
app.use('/api/sampleroute', sampleRoute);
app.use('/api/movie', movieRoute);

//Database Connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => console.log("connected to database"));

//Server connection
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server Running at port: ${PORT}`)); 