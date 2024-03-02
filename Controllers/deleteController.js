const taskModel = require('../Models/taskModel');

const deleteTask = async (req,res) => {
    
    const task_id = parseInt(req.params.id);
    console.log(task_id)
    console.log("soft delete Task")
    try {

    
        const result = await taskModel.findOneAndUpdate(
            { 
              task_id: task_id,
            },
            { 
              $set: { 
                'deleted': true,
                
              }
            },
            { new: true }
          );
    

        console.log('soft delete task:', result);
        console.log(result)
        if (result) {console.log('Task soft delete  successfully');
            return res.status(200).json({ message: 'Task soft delete succesfully' });
         
        } else {
            console.log('Task not found or no changes made');
            return res.status(404).json({ message: 'Task not found' });
          
        }
      } catch (error) {
        console.error('Error updating task:', error);
        return res.status(404).json({ message: 'Task not found',error,error});
       
      }
};



module.exports = {deleteTask};
