//<----------set up mongoose connection------------->
console.log("db is config");
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("connected to database")
);
mongoose.Promise = global.Promise;

module.exports = mongoose;