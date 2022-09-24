const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      try {
        const { email, password, username, firstName, lastName } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName });
        let token = await setTokenCookie(res, user);

        let parsedUser = user.toJSON()
        parsedUser.token = token

        return res.json(parsedUser);

      } catch (err) {
          err.status = 403
          err.message = "User already exists"
          const path = err.errors[0].path
          let message = ''
          if (path === 'email') {
            message = "User with that email already exists"
          } else if (path === 'username') {
            message = "User with that username already exists"
          }
          err.allErrors = {}
          err.allErrors[path] = message
          res.json({
            message: err.message,
            statusCode: err.status,
            errors: err.allErrors,
          })
      }
    }
);

module.exports = router;
