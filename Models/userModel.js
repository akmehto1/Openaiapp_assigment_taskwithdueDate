const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id:{
    type: Number,
    unique: true,
    required: true
  },
  phone_number: {
    type: Number,
    required: true,
    unique: true
  },
  priority: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  },
  task_id:[{
    type:Number,
    ref:"taskModel"
  }]
});

// subTaskSchema.virtual("taskModel", {
//   ref: "taskModel", // Reference to the Task model
//   localField: "task_id",
//   foreignField: "task_id",
//   justOne: true
// });

const User = mongoose.model('userModel', userSchema);

module.exports = User;

