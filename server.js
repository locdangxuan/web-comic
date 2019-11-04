//----------------dotenv------------------>
require('dotenv').config();

//<---------------const--------------------->

const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('./config/database'); //database configuration
const userRoute = require('./routes/user.route');
const comicRoute = require('./routes/comic.route');

//<---------------connect to database------------------->
mongoose.set('useFindAndModify', false); //modify user when update and delete
mongoose.connection.on('error', console.error.bind(console, "Mongo connection fail"));


//<----------------middleware--------------------->
app.use(express.json());

//<---------------routeMiddleware----------------->
app.use('/api/users', userRoute);
app.use('/api/comics', comicRoute);

//<---------------start server-------------------------->
app.listen(port, () => {console.log("Server running in port " + port)});