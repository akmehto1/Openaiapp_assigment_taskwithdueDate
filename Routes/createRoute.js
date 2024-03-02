const {createSubTaskHandler,createTaskHandler}=require('../Controllers/createTaskandSubtask.js');
const auth=require('../Middleware/auth.js');
const { validateTask, validateSubTask, handleValidationErrors } = require('../Middleware/validation.js');

const router = require('express').Router()


router.post('/task' ,auth,validateTask,createTaskHandler);
router.post('/sub-task',auth,validateSubTask,createSubTaskHandler);

module.exports  = router



