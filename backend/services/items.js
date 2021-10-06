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

    return { data }
}

async function createItem ( item, userId ) {
    if ( !userId ) throw { code: 400, message: 'User ID not provided...' }

    const { name, description = '', purchased = false } = item;
    let result;
    const query = await db.query(
      `INSERT INTO items (name, description, user_id, purchased) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, userId, purchased],
      (error, results) => {
        if (error) throw error;
        result = { code: 200, message: 'Success' };
      }
    );

    console.log('result: ', result)

    return result
}

async function updateItem ( item ) {
    if ( !item.id ) throw { code: 400, message: 'No item ID provided...' }

    const { id, name, description = '', purchased = false } = item;

    await db.query(
      `UPDATE items SET name = $1, description = $2, purchased = $3 WHERE id = $4 RETURNING *`,
      [name, description, purchased, id],
      (error, results) => {
        if (error) throw error;
      }
    );

    return {id}
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
    deleteItem
}