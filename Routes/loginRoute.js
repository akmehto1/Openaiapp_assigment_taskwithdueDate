const loginHandler=require('../Controllers/loginController');

const router = require('express').Router()

// const { loginLimiter } = require('../middleware/ratelimit');

router.post('/' ,loginHandler)
module.exports  = router