const db = require( './db' );
const util = require( '../util' );
const config = require( '../config' );

async function getItemsByUser ( page = 1, userId ) {
    if ( !userId ) throw new Error( { code: 400, message: 'User ID not provided...' } )

    const offset = util.getOffset( page, config.itemsPerPage );
    const rows = await db.query(
        `SELECT * FROM items WHERE user_id = ${userId} OFFSET $1 LIMIT $2`,
        [offset, config.itemsPerPage]
    )
    const data = util.emptyOrRows( rows );

    return { data }
}

module.exports = {
    getItemsByUser
}