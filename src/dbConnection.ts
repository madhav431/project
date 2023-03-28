import mysql from "mysql2"

let connection = mysql.createConnection({
  host: "34.122.10.249",
  user: "root",
  password: 'VLz{#O|h^9`Y|1lK',
  database: "hms",
  port: 3306,
})

connection.connect((err) => {
  if (err) console.log("Error in connecting to database",err)

  console.log("Database connected successfully")
})
export { connection }
