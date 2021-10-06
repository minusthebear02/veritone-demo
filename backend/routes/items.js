const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const items = require( '../services/items' );

const itemValidate = [
    check( 'name', 'Name is a required field' ).isLength( { min: 2 }).trim().escape(),
    check( 'description' ).trim().escape(),
    check( 'purchased' ).trim().escape()
  ]

/* GET items. */
router.get('/', async function(req, res, next) {
    try {
        res.json(await items.getItemsByUser(req.query.page, req.query.userId));
    } catch ( err ) {
        console.error( `Error while getting items `, err.message );
        res.status(err.code).send(err.message)

        next(err);
    }
} );

/* CREATE item. */
router.post( '/', itemValidate, async function ( req, res, next ) {
    try {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 422 ).json( { errors: errors.array() } );
        }

        const { name, description = '', purchased = false, userId } = req.body;
        const item = {
            name,
            description,
            purchased: purchased === '' ? false : purchased
        }

        res.json( await items.createItem( item, userId ) );
    } catch ( err ) {
        console.error( `Error while creating an item `, err.message );
        res.status( err.code ).send( err.message )

        next(err)
    }
} )

/* UPDATE item */
router.put( '/', itemValidate, async function ( req, res, next ) {
    try {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 422 ).json( { errors: errors.array() } );
        }

        const { id, name, description = '', purchased = false } = req.body;
        const item = {
            id,
            name,
            description,
            purchased: purchased === '' ? false : purchased
        }

        res.json( await items.updateItem( item ) );
    } catch ( err ) {
        console.error(`Error while updating an item `, err.message);
        res.status(err.code).send(err.message);

        next(err);
    }
} )

/* DELETE item */
router.delete( '/', async function ( req, res, next ) {
    try {
        res.json( await items.deleteItem( req.body.id ))
    } catch ( err ) {
        console.error(`Error while updating an item `, err.message);
        res.status(err.code).send(err.message);

        next(err);
    }
})

module.exports = router;