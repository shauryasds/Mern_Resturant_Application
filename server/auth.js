const jwt=require('jsonwebtoken');
const User = require('./models/UserModel');
async function auth(req, res, next) {
    const JWT_SECRET_KEY =  process.env.JWT_SECRET_KEY;
    try {
      const token = req.cookies['user'];
      console.log('Token:', token);
  
      try {
        const decoded = await jwt.verify(token, JWT_SECRET_KEY);
        console.log('Decoded:', decoded);
  
        const result = await User.findOne({ email: decoded.email });
        console.log('Result:', result);
  
        if (result !== null && result.role === 'admin') {
          console.log('verified user from auth');
          next();
        } else {
          res.json({ success: 'false', error: 'true', body: 'Unauthorized' });
        }
      } catch (e) {
        console.log('Error verifying token:', e);
        res.json({ success: 'false', error: 'true', body: 'Invalid token' });
      }
    } catch (e) {
      console.log('Error:', e);
      res.json({ success: 'false', error: 'true', body: 'Internal error' });
    }
  }
  
  module.exports = auth;
