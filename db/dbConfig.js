const mongoose = require('mongoose');

module.exports=mongoose.connect("mongodb://0.0.0.0:27017/OpeninApp")
  .then(() => console.log("connection succesfull with MongoDB"))
  .catch((err) => console.log(err));



