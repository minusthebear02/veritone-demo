const db = require( './db' );

async function login ( email, password ) {
    if (!email) throw { code: 400, message: 'No email provided...' }
    if ( !password ) throw { code: 400, message: 'No password provided...' }

    const result = await db.query(
        `SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1`,
        [email, password]
    )

    if (!result) throw { code: 401, message: 'No user found with that email and/or password combination. Please try again...' }

    return { user: result[0] }
}


module.exports = {
    login
}