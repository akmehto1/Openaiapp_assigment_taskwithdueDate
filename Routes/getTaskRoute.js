const  {getAllUserTasks,getAllUserSubTasks}=require('../Controllers/getTask');
// const auth=require('../Middleware/auth.js');

const router = require('express').Router()


router.post('/task' ,getAllUserTasks)
router.post('/subtask',getAllUserSubTasks,)

module.exports  = router