const signUpHandler=require('../Controllers/signController');

const router = require('express').Router()



router.post('/',signUpHandler)
module.exports  = router

