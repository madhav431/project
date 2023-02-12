import mysql from "mysql2"

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Praveen@8919296298",
  database: "hms",
  port: 3306,
})

connection.connect((err) => {
  if (err) console.log("Error in connecting to database")

  console.log("Database connected successfully")
})
export { connection }
