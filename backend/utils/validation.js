const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    // const errors = validationErrors
    //   .array()
    //   .map((error) => `${error.msg}`);
    const errors = validationErrors.array()
    let allErrors = {}
    errors.forEach(err => {
      allErrors[err.param] = err.msg
    })

    const err = Error("Validation error");
    err.errors = allErrors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
