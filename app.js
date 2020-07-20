require('dotenv').config()

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// my routes
const authRoutes = require("./routes/auth")

// db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log("DB CONNECTED")
}).catch = (err) => {
    console.log("oops DB got disconnected");
}



// middlewares 
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// routes
app.use("/api",  authRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
})