const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    
    phone: {
      type: Number,
      required: true,
      unique:true
    },
    role: {
      type: String,
      required: true
      ,enum:['admin','general']
    },
    address: {
      type: String,
      required: true
    }
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;