const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const path = require('path');

const router = require('./routes/UserRoutes');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173', 'https://earnest-marigold-9863cd.netlify.app/'];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', router);

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection successful");
    } catch (error) {
        console.log("Connection error", error);
    }
}
connectDB();

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
