// Delete after decide to move POSTGRES DB inside Vercel
import mysql from 'mysql2/promise';


export default async function excuteQuery({ query, values }: { query: string; values?: any }) {

    // Create connection with DB
    // const dbconnection = await mysql.createConnection({
    //     host: "mtapanel.mtacloud.co.il",
    //     database: "isyuvald_housekeeper",
    //     user: "isyuvald_sadna",
    //     password: "7Hncb(Z1&4%e",
    // });

    // MTA DB - local project
    const dbconnection = await mysql.createConnection({
        host: "localhost",
        database: "isyuvald_housekeeper",
        user: "isyuvald_sadna",
        password: "7Hncb(Z1&4%e",
    });
    // const dbconnection = await mysql.createConnection({
    //     host:"localhost",
    //     database: "housekeeper_db",
    //     user: "root",
    //     password: "",
    // });

    try {
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();
        return data;
    } catch (error) {
        return { error };
    }
}