const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user_id:{
    type: Number,
    ref: 'userModel',
    required:true
   },
  task_id: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  priority: {
    type: Number,
    default: 0
  },count:{
    type:Number,
    default :0
  },
  status: {
    type: String,
    enum: ["TODO", "DONE","IN_PROGRESS"],
    default: "TODO"
  },
  deleted: {
    type: Boolean,
    default:false
  },
  subtask:[
    {type:mongoose.Schema.ObjectId,
    ref:'subTask'}
  ]
  // Other fields as needed
});

// Calculate priority based on due date
taskSchema.pre('save', function (next) {
  const currentDate = new Date();
  const dueDate = this.due_date;
  const differenceInDays = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));

  if (differenceInDays === 0) {
    this.priority = 0; // Due date is today
  } else if (differenceInDays >= 1 && differenceInDays <= 2) {
    this.priority = 1; // Due date is between tomorrow and day after tomorrow
  } else if (differenceInDays >= 3 && differenceInDays <= 4) {
    this.priority = 2; // Due date is 3-4 days away
  } else {
    this.priority = 3; // Due date is 5+ days away
  }

  next();
});



taskSchema.methods.updateCount = async function () {
  try {
    this.count += 1;


    if(this.count>this.subtask.length)return -1;
    if(this.count===this.subtask.length){
      this.status="DONE"
    }
    else {
      this.status="IN_PROGRESS"
    }
    
    await this.save();

    return this.count;
  } catch (error) {
    throw new Error('Failed to update count');
  }
};


const Task = mongoose.model("taskModel", taskSchema);

module.exports = Task;


