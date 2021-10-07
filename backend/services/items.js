const db = require( './db' );
const util = require( '../util' );
const config = require( '../config' );

async function getItemsByUser ( page = 1, userId ) {
    if ( !userId ) throw { code: 400, message: 'User ID not provided...' }

    const offset = util.getOffset( page, config.itemsPerPage );
    const rows = await db.query(
        `SELECT * FROM items WHERE user_id = $1 OFFSET $2 LIMIT $3`,
        [userId, offset, config.itemsPerPage],
        ( error, results ) => {
            if ( error ) {
                throw error
            }
        }
    )
    const data = util.emptyOrRows( rows );
    const meta = { nextPage: data.length === config.itemsPerPage ? page + 1 : false}

    return { data, meta }
}

async function createItem ( item, userId ) {
    if ( !userId ) throw { code: 400, message: 'User ID not provided...' }

    const { name, description = '', purchased = false, quantity = 1 } = item;
    const result = await db.query(
      `INSERT INTO items (name, description, user_id, purchased, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, userId, purchased, quantity],
      (error, results) => {
        if (error) throw error;
      }
    );

    return {item: result[0]}
}

async function updateItem ( item ) {
    if ( !item.id ) throw { code: 400, message: 'No item ID provided...' }

    const { id, name, description = '', purchased = false, quantity = 1 } = item;

    const result = await db.query(
      `UPDATE items SET name = $1, description = $2, purchased = $3, quantity = $4 WHERE id = $5 RETURNING *`,
      [name, description, purchased, quantity, id],
      (error, results) => {
        if (error) throw error;
      }
    );

    return {item: result[0]}
}

async function updatePurchased ( itemId, isPurchased ) {
    if (!itemId) throw { code: 400, message: 'No item ID provided...'}

    const result = await db.query(
      `UPDATE items SET purchased = $1 WHERE id = $2 RETURNING *`,
      [isPurchased, itemId],
      (error, results) => {
        if (error) throw error;
      }
    );

    return {item: result[0]}
}

async function deleteItem ( itemId ) {
    if ( !itemId ) throw { code: 400, message: 'No Item ID provided...' }

    await db.query(
        `DELETE FROM items WHERE id = $1`,
        [itemId],
        ( error ) => { if (error) throw error}
    )

    return `Item ${itemId} successfully deleted!`
}

module.exports = {
    getItemsByUser,
    createItem,
    updateItem,
    deleteItem,
    updatePurchased
}