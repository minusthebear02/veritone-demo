var express = require('express');
var router = express.Router();
const user = require('../services/user');

router.post( '/login', async function ( req, res, next ) {
  const { email, password } = req.body
  try {
    res.json(await user.login(email, password));
  } catch ( err ) {
    console.error( `Error while loggin in `, err.message );
    res.status(err.code).send(err.message)
    next(err.message);
  }
})

module.exports = router;
