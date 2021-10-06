require( 'dotenv' ).config()

const { env } = process

const config = {
    db: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    },
    listPerPage: 20,
};

module.exports = config;