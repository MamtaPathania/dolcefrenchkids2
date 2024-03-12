var mysql2=require('mysql2')
const dotenv=require('dotenv')
dotenv.config()

const db = mysql2.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DB,
    port:process.env.DB_PORT})

module.exports=db;