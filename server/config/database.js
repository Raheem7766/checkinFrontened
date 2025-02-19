let mongoose = require("mongoose")
let connect = require("../.env")
dotenv.config({ path: "../.env" })

connect()

let connectDatabase = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@raheem.hhn2q0u.mongodb.net/?retryWrites=true&w=majority&appName=Raheem`).then(() => {
        console.log("db is connected");
    })
}

module.exports = connectDatabase  