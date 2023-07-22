const {Pool} = require("pg");

const pool = new Pool({
    user : 'postgres',
    password : 'lintcloud',
    host : 'localhost',
    port : 5432,
    database : 'node_with_postgresql'
});


module.exports = pool