const express = require('express')
const { User } = require('./database')
const app = express()
app.use(express.json())

const newUser = new User({
    name: "abdul",
    email: "bayees1@gmai.com",
    password: "1234",

})
newUser.save().then(() => { console.log("user saved successfully");})



app.listen(3000)