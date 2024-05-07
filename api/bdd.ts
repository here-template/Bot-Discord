import mysql from 'mysql';
import {client} from "../index";

let connection: mysql.Connection | null = null;
if (client.config?.bdd) {
    connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });
}

export default {
    connection,
    query: (sql: string, values: any[]) => {
        return new Promise((resolve, reject) => {
            if (!connection) {
                reject("No connection to database");
            }

            // @ts-ignore
            connection.query(sql, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }
}