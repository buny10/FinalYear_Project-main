const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/auth");

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5180",
  credentials: true
}));
app.use("/", authRoutes); // handles /login and /register

mongoose.connect('mongodb://127.0.0.1:27017/businessDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.listen(5000, () => console.log('Server running on port 5000'));