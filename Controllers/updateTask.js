const taskModel = require('../Models/taskModel');
const subModel=require('../Models/subModel.js');
const updateTask = async (req, res) => {
    console.log(req.params.id)
  const task_id = parseInt(req.params.id);

  const { due_date, status } = req.body;

  try {
    // const updatedTask = await taskModel.findByIdAndUpdate(
    //   task_id,
    //   { due_date, status },
    //   { new: true }
    // );


    const updatedTask = await taskModel.findOneAndUpdate(
        { 
          task_id: task_id,
        },
        { 
          $set: { 
            'due_date': due_date,
            'status':status
          }
        },
        { new: true }
      );




    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const updateSubTask = async (req, res) => {
    console.log(req.params.id)
    const id = parseInt(req.params.id);

  const { status } = req.body;

  try {
    // const updatedTask = await taskModel.findByIdAndUpdate(
    //   task_id,
    //   { due_date, status },
    //   { new: true }
    // );


    const updatedSubTask = await subModel.findOneAndUpdate(
        { 
          id:id,
        },
        { 
          $set: { 
            'status':status
          }
        },
        { new: true }
      );

     
     if(status ===1){
        const subtask=await subModel.findOne({id:id});
        const task_id=subtask.task_id;
        const task = await taskModel.findOne({ task_id: task_id});

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedCount = await task.updateCount();
    console.log(updatedCount);
    

        
        
       
    

     }
      



    if (!updatedSubTask) {
      return res.status(404).json({ message: 'Sub Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', updatedSubTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



module.exports = {
  updateTask,updateSubTask
};
