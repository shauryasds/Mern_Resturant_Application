const dotenv = require("dotenv")
dotenv.config()
const cookieParser = require('cookie-parser');

const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const DB_PASSWORD = "m780kKiH2jGkiQuo"
  // process.env.DB_PASSWORD;

async function connectDb(){
  if (!DB_PASSWORD) {
    console.error('DB_PASSWORD environment variable is not set');
    process.exit(1);
  }
  try {
    let response = await mongoose.connect(`mongodb+srv://shauryadeep589:${DB_PASSWORD}@maincluster.yousi.mongodb.net/TastyTreatDb?retryWrites=true&w=majority&appName=Maincluster`);
    console.log("DB_CONNECTED")
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
  }
}

async function startServer() {
  await connectDb();
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  const stripe = require('stripe')("sk_test_51PyzTrP7CpbP5uBpz8R3iScDouoldMwUhShEn7s6Gc0de3yHxxjGl8A9KdIfuBZ6aIjQJ8o4UAZhhbC0oK1u528q00g0YNuzcY");

  const router = require('./routes/index');
  const port = 4000;
    // process.env.PORT_NAME;
  
  app.use(cors({
    origin: "https://mern-resturant-application1.vercel.app",
      // process.env.FRONT_END_URL,
    credentials: true
  }));
  
  app.use('/api', router);
  app.listen(4000, () => {
    console.log(` listening on port ${port}`);
  });
}

startServer();
