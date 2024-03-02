const User = require("../Models/userModel");
const mongoose=require('mongoose')
const colors=require('colors')

const signUpHandler = async (req, res) => {
    console.log("Signup Handler".rainbow);
   
  const { id, phone_number,priority} = req.body;

  
  try {
    
    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({
        $or: [
          { id: id },
          { phone_number:phone_number }
        ]
      });
   


    //execute when the user already exists
    if (existingUser) {
      // User with the same id already exists
      return res
        .status(409)
        .json({ error: "User with this id or phone number already exists" });
    }


    

    // Create a new user
    const newUser = new User({
        id, phone_number,priority});
    
   //save the user in database
   const user=newUser.save();



  res.status(200).send({message:"User signup"})


  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = signUpHandler;
