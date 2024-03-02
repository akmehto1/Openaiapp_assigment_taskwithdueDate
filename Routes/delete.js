const {deleteTask}=require('../Controllers/deleteController')

const router = require('express').Router()


router.post('/task/:id' ,deleteTask);

module.exports  = router





