var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const user = require("../services/user");

const userValidate = [
  check("name").trim().escape(),
  check("email", "Email must be an active email address")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check("password").trim().escape(),
];

router.post("/login", userValidate, async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    res.json(await user.login(email, password));
  } catch (err) {
    console.error(`Error while loggin in `, err.message);
    res.status(err.code).send(err.message);
    next(err.message);
  }
});

/* CREATE user */
router.post("/", userValidate, async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    res.json(await user.createUser(name, email, password));
  } catch (err) {
    console.error(`Error while creating user: `, err.message);
    res.status(err.code).send(err.message);
    next(err.message);
  }
});

module.exports = router;
