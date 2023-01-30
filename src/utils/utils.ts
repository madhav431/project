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
        let sql = `SELECT COUNT(*) FROM users WHERE u_email='${email}'`
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
}

export default Utils
