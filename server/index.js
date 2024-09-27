const dotenv = require("dotenv")
dotenv.config()
const cookieParser = require('cookie-parser');

const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const DB_PASSWORD = process.env.DB_PASSWORD;

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

//  app.use(cors({
  origin: ['https://mern-resturant-application1-git-master-shaurya-deeps-projects.vercel.app'], // allow requests from this origin
  credentials: true, // allow credentials (e.g., cookies) to be sent
};));
     
  app.use(cookieParser());
  app.use(express.json());
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const router = require('./routes/index');
  const port = process.env.PORT_NAME;
  
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mern-resturant-application1-git-master-shaurya-deeps-projects.vercel.app');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  next();
});


  
  app.use('/api', router);
  app.listen(port, () => {
    console.log(` listening on port ${port}`);
  });
}

startServer();
