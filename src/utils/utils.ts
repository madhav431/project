import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { connection } from "../dbConnection"
class Utils {
  static saltRounds = 10

  static generateToken(id: string, secret: string): string {
    try {
      return jwt.sign(
        {
          data: id,
        },
        secret,
        { expiresIn: "1h" }
      )
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  static verifyToken(token: string, secret: string) {
    try {
      return jwt.verify(token, secret)
    } catch (err) {
      throw err
    }
  }
  static async hashPassword(password: any) {
    return await bcrypt.hash(password, 10)
  }
  static async checkEmailExists(email: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let sql = `SELECT COUNT(*) FROM hms_patients WHERE email='${email}'`
        connection.query(sql, (err, result) => {
          if (err) throw err
          resolve(result)
        })
      } catch (err) {
        console.log(err)
        return reject(err)
      }
    })
  }
  static async verifyPassword(email: string | any, userPassword: string | any) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT password FROM hms_patients WHERE email='${email}'`
      connection.query(sql, (err, result: any) => {
        if (err) return console.error(err)
        return bcrypt
          .compare(userPassword, result[0].password)
          .then((result) => {
            resolve(result)
          })
      })
    })
  }
  static async get_user_with_id(id: string|any) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT count(*) FROM hms_patients WHERE id='${id}'`
      connection.query(sql, (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
    
  }
}

export default Utils
