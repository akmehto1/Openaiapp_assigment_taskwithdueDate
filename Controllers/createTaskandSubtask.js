const taskModel = require("../Models/taskModel.js");
const userModel=require('../Models/userModel.js');
const subModel=require('../Models/subModel.js');














const createTaskHandler = async (req, resp) => {
  console.log("Creating task");
  
  const id = req.id;
  console.log(id);


  const user=await userModel.findOne({id: id});

  
  
//   console.log(user);
//   console.log(id);
console.log(user)
  const user_id=user._id;
  const { title, description, due_date,task_id} = req.body;
  
  try {
    const newTask = new taskModel({
      user_id:id,
      title,
      task_id,
      description,
      due_date,
    });

    const task = await newTask.save();
    const updatedUser = await userModel.findOneAndUpdate(
        { _id: user_id },
        { $push: { task_id:newTask.task_id} },
        { new: true }
      );



    return resp.status(200).send({ success: true, message: `Task Created`, task, updatedUser });
  } catch (err) {
    console.log(err);
    resp.status(400).json({ message: "Internal Server Error", error: err });
  }
};

















const createSubTaskHandler = async (req, resp) => {
  console.log("Creating Sub task");
  
  // //fro  authentication of json 
  // const id = req.id;

  const {task_id,id}=req.body;



  const user=await userModel.findOne({id: id});
  // print(user);
   console.log(req.body.task_id);
  const usersWithTask = await taskModel.findOne({ task_id:req.body.task_id });
  console.log(usersWithTask);

  if(usersWithTask==null){
    return resp.status(400).json({ message: "Task id not exist",});
  }
  // const task=await taskModel.findOne({})

  
  
// //   console.log(user);
// //   console.log(id);
// console.log(user)
//   const user_id=user._id;
//   const { title, description, due_date } = req.body;

  try {
    const newSubTask = new subModel({
      task_id,id
    });

    const task = await newSubTask.save();
    const updatedTask = await taskModel.findOneAndUpdate(
        { task_id: task_id },
        { $push: { subtask:newSubTask._id} },
        { new: true }
      );



    return resp.status(200).send({ success: true, message: `Task Created`, newSubTask});
  } catch (err) {
    console.log(err);
    resp.status(400).json({ message: "Internal Server Error", error: err });
  }
};









module.exports = {createTaskHandler,createSubTaskHandler};
