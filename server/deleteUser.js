const UserModel = require("./models/UserModel");

async function deleteUser(req, res) {
    try {
      const  data   = req.body;
      console.log("delete",data)
     
  
      const user = await UserModel.findByIdAndDelete(data.userId).catch((E)=>console.log(E));
      
      if (user) {
        res.json({ success: true, error: false, body: user, message: "user deleted" });
      } else {
        res.json({ error: true, success: false, body: data, message: "user not deleted" });
      }
    } catch (e) {
      res.status(500).json({ success: false, error: true, body: {}, message: e.message });
    }
  }

module.exports = deleteUser;