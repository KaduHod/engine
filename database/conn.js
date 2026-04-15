import mysql from 'mysql2';
import { loadEnvFile } from "process";

function createConn() {
    loadEnvFile()
    const connection = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,      // Replace with your MySQL username
        password: process.env.DB_PASS, // Replace with your MySQL password
        database: process.env.DB_NAME,   // Replace with your database name
        waitForConnections: true,
        connectionLimit: 10,  // máximo de conexões simultâneas
        queueLimit: 0
    });
    return connection;
}

const pool = createConn();
export default pool;
