const express = require('express');
const router = express.Router();
const items = require('../services/items');

/* GET items. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await items.getItemsByUser(req.body.page, req.body.userId));
  } catch ( err ) {
      console.error( `Error while getting items `, err.message.message );
    res.status(err.code).send(err.message)

    next(err);
  }
});

module.exports = router;