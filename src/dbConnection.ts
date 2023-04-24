import mysql from "mysql2"

const connection = mysql.createPool({
  host:"34.122.10.249",
  user:"root",
  password:"root@1234",
  database:"hms",
  port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})



connection.getConnection((err, connection) => {
  if (err) {
    console.log(err)
    return
  } else {
    console.log("Connected to database")
    connection.release()
  }
})

export { connection }
