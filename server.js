//----------------dotenv------------------>
require('dotenv').config();

//<---------------const module--------------------->
const express = require('express');
const app = express();
const port = 3000;

//<---------------const api route------------------->
const mongoose = require('./config/database'); //database configuration
const userRoute = require('./routes/user.route');
const comicRoute = require('./routes/comic.route');
// const chapterRoute = require('./routes/chapter.route');

//<---------------const view route------------------>
const viewComicRoute = require('./app/views/routes/comic.view.route');
const viewUserRoute = require('./app/views/routes/user.view.route');
//<---------------connect to database------------------->
mongoose.set('useFindAndModify', false); //modify user when update and delete
mongoose.connection.on('error', console.error.bind(console, "Mongo connection fail"));

//<-------------------pug html--------------------------->
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
	res.render('index', {
		comic: 'Comics'
	});
});
//<----------------middleware json--------------------->
app.use(express.json());

//<---------------api route----------------->
app.use('/api/users', userRoute);
app.use('/api/comics', comicRoute);
// app.use('/api/comics/:id', chapterRoute);
//<---------------view route--------------->
app.use('/comics', viewComicRoute);
app.use('/users', viewUserRoute);

//<---------------start server-------------------------->
app.listen(port, () => {console.log("Server running in port " + port)});