//<-----------set up mongoose connection------------->
console.log("db is config");
const mongoose = require('mongoose');

//mongodb+srv://locdangxuan123:vangvang17071998@cluster0-xac1v.mongodb.net/test?retryWrites=true&w=majority
//mongodb://localhost:27017/authentication
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("connected to database")
);
mongoose.Promise = global.Promise;

module.exports = mongoose;