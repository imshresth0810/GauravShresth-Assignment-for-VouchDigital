const mongoose = require('mongoose');
const mongostr = "mongodb+srv://vouchDB:vouchDB@cluster0.gwzhi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const mongostr = "mongodb://localhost:27017/vouch?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongostr, () => {
        console.log("MongoDB connection Successfull");
    })
}

module.exports = connectToMongo;