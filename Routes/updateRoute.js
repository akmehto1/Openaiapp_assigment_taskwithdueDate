const {updateTask,updateSubTask}=require('../Controllers/updateTask.js')
const auth=require('../Middleware/auth.js');

const router = require('express').Router()


router.post('/task/:id' ,updateTask);

router.post('/subtask/:id' ,updateSubTask);


module.exports  = router



