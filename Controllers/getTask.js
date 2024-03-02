const taskModel=require('../Models/taskModel')
const SubTask = require('../Models/subModel');



const getAllUserTasks = async (req, res) => {
    console.log("get route task");
    const {priority, status, due_date, page = 1, limit = 10 } = req.body;
  
    const query = {
     
      priority: priority, 
    };

    if (due_date) {
      query.due_date = { $lte: new Date(due_date)}; // Due date less than or equal to the provided due_date
    }

  try {
    const tasks = await taskModel.find(query)
      .skip((page-1) * limit)
      .limit(limit)
      .exec();
    
console.log(tasks);
    const totalCount = await taskModel.countDocuments(query);

    res.status(200).json({
      total:totalCount,
      page: parseInt(page),
      limit: parseInt(limit),
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};










const getAllUserSubTasks = async (req, res) => {
  console.log("get sub task");
  const { task_id, page = 1, limit = 10,status} = req.body;
  
  const query = {
    status:status,
  
    task_id: task_id, // If task_id is provided, filter by it, else get all subtasks
  };

  try {
    const subtasks = await SubTask.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalCount = await SubTask.countDocuments(query);

    res.status(200).json({
      total: totalCount,
      page: parseInt(page),
      limit: parseInt(limit),
      subtasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllUserSubTasks,getAllUserTasks
};


