const User = require("./models/UserModel");
const bcrypt = require('bcrypt');

async function signup(req, res) {
  const { name, email, password, cpassword, phone,address,role } = req.body;

  if (password !== cpassword) {
    return res.status(400).send({ error: "Passwords do not match" });
  }
  // console.log("p match")
  const saltRounds = 10;
  const hashedpassword=await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    name,
    "password":hashedpassword,
    phone,
    address,
    role
  });
  try {
    const user_data=await user.save();
    res.json({ success: "true", error: "false", message: "user created" })
        
      
  } catch (e) {
    console.log(e);
    res.status(500).json({ message:e.errmsg, success: "false", error: "true"


     });
  }
}

module.exports = signup ;
