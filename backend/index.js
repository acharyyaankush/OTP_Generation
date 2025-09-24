// require('dotenv').config();
// const express = require('express');

// const router = express.Router()

// module.exports = router;
// const mongoose = require('mongoose');
// const mongoString = process.env.DATABASE_URL;

// mongoose.connect(mongoString);
// const database = mongoose.connection;


// database.on('error', (error) => {
//     console.log(error)
// })

// database.once('connected', () => {
//     console.log('Database Connected');
// })
// const app = express();
// app.use(express.json());
// const usercontroller = require('./controller/UserController');
// app.use('/user', usercontroller)

// app.listen(3000, () => {
//     console.log(`Server Started at ${3000}`)
// })

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json()); 

app.use(cors({
    origin:'*'
}))

const url=process.env.DATABASE_URL

mongoose.connect(url);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})


database.once('connected', () => {
    console.log('Database Connected');
})


const usercontroller = require("./controller/UserController")
app.use("/user",usercontroller)


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

