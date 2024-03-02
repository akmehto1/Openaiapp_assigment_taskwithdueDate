const User = require('../Models/userModel');

var jwt = require('jsonwebtoken');

const loginHandler = async (req, res) => {
  try {
    console.log("login".green);

    const { id } = req.body;
    console.log(req.body);
    const user = await User.findOne({ id: id });

    if (!user) {
      return res.status(404).json({ message: "User Not Found Id" });
    } else {
      var token = jwt.sign({ id:id }, 'shhhhh');
      return res.status(201).json({ message: `User login successfully`,user:user, token: token });
    }
  } catch (error) {
    console.error("Error in loginHandler:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = loginHandler;
