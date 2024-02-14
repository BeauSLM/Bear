
require('dotenv').config({path: '../.env'});

module.exports = {
    development: {
        client: 'mysql2',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/migrations'
        },
        seeds: {
            directory: __dirname + '/seeds'
        }
    }
};