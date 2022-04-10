const connectToMongo = require('./db.js');
const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
connectToMongo();

app.use(express.json());
app.use(cors())

const port = 4000;

app.use('/user', require('./routes/userRoute.js'));

app.listen(port, () => {
    console.log(`Port is listening at http://localhost:${port}`)
})
