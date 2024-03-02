// middleware/validationMiddleware.js

const { check,validationResult } = require('express-validator');

// Validation for Task creation
const validateTask = [
  check('task_id').isInt(),
  check('title').isString().notEmpty(),
  check('description').isString().notEmpty(),
  check('due_date').isISO8601().toDate(),
  // Add more validations as needed
];

// Validation for SubTask creation
const validateSubTask = [
  check('task_id').isInt(),
//   check('status').isInt({ min: 0, max: 1 }),
  // Add more validations as needed
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateTask,
  validateSubTask,
  handleValidationErrors,
};


