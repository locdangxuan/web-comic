//<-----------set up mongoose connection------------->
console.log("db is config");
const mongoose = require('mongoose');

//mongodb+srv://web-comics:4everalone@cluster0-xhzvc.mongodb.net/test?retryWrites=true&w=majority
//mongodb://localhost:27017/web-comic
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("connected to database " + process.env.MONGO_URL)
);
mongoose.Promise = global.Promise;

module.exports = mongoose;