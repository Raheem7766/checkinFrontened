let express = require('express')
let app = express()
let cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(cors()) 
app.use(cookieParser()); 
app.use(express.json())

module.exports = app       