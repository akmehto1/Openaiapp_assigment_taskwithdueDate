const mongoose = require('mongoose');
const { Schema } = mongoose;

const subTaskSchema = new Schema({
  task_id: {
    type: Number,
    ref: 'taskModel',
    required: true
  },
  id:{
    type:Number,
     unique:true,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date,
    default: null
  }
});

const SubTask = mongoose.model('subTaskModel', subTaskSchema);

module.exports = SubTask;

