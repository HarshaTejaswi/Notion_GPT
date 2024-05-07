const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose")
const path = require('path')
const dotenv = require('dotenv').config(path.join(__dirname, '../.env'))

const notionGPTRoutes = require("./routes/index.routes")

// const PORT = process.env.SERVER_PORT
const PORT = process.env.SERVER_PORT;
const DB_URI = process.env.DB_URI

mongoose
    .connect(`${DB_URI}`)
    .then(() => console.log("Connected to DB at", DB_URI))
    .catch((e) => console.log("Failed to connect to DB", e));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }))

app.use(cors());
app.options("*", cors());

app.use(express.json())

app.use('/v1', notionGPTRoutes)

app.listen(PORT, console.log(`Server started on port http://localhost:${PORT}/v1`))
