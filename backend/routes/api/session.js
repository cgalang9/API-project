const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required",),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors
];

// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;
    console.log(password)

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      err.title = 'Login failed';
      return next(err);
    }

    let token = await setTokenCookie(res, user);

    let parsedUser = user.toJSON()
    parsedUser.token = token

    return res.json(parsedUser);
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    console.log(req.user)
    if (user) {
      return res.json(user.toSafeObject());
    } else {
      return res.json({});
    }
  }
);



module.exports = router;
