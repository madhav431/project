import mysql from "mysql2"

let connection =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Praveen@8919296298",
    database:"hms",
    port: 3306
})

connection.on("error",()=>{
    console.log("Failed to connect to db")  
})

export {connection}