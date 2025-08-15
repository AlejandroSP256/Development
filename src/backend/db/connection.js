import mysql from 'mysql'
import { loadEnvFile } from 'node:process'
import process from 'node:process'
loadEnvFile('./.env')

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

conn.connect((err) => {
    if (err) {
        console.error(`Error al conectar a MySQL: ${err}`)
        return
    }
    console.log('Conectado a MySQL')
})

export default conn