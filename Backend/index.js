const express = require('express')
const { User } = require('./database')
const  router = express.Router()
const AllRoutes = require("./AllRoutes")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(AllRoutes)
// const newUser = new User({
//     name: "abdul",
//     email: "bayees1@gmai.com",
//     password: "1234",

// })

// newUser.save().then(() => { console.log("user saved successfully");})



app.listen(4000)