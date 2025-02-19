const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
let mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })   
);
 
app.use(express.json());
app.use(cookieParser());
 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });    

const auth = require("./routes/User");
app.use("/api/v1", auth);
 
app.listen(PORT, () => {
  console.log(
    `Server started on PORT ${process.env.PORT} in ${NODE_ENV} mode.`
  );
});
   