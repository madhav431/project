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
  static async verifyDoctorPassword(email: string | any, userPassword: string | any) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT password FROM hms_doctor WHERE email='${email}'`
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

  static async get_user_with_id(id: string | any) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT count(*) FROM hms_patients WHERE id='${id}'`
      connection.query(sql, (err, result) => {
        if (err) throw err
        resolve(result)
      })
    })
  }
  static async _check_doctor_exists(email: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (email.length <= 1) throw new Error("email-invalid")
      let matchString = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!matchString.test(email)) throw new Error("email-invalid")

      let sql = `SELECT COUNT(*) FROM hms_doctor WHERE email='${email}'`

      connection.query(sql, (err, result) => {
        if (err) throw err
        resolve(result)
      })
    }).catch((err: Error) => {
      console.log(err)
      throw err
    })
  }

  static async _check_appointment_exists_for_doctor(doctorId: any,appointment_date:any,appointment_time:any){
    let sql = `SELECT * from hms_appointments where id="${doctorId}"`
    let data: any[] =[]
    connection.query(sql, (err, rows:any) => {
      if (err) throw err
      data.push(...rows)
    })
    console.log(data);
    
    data.filter((item:any)=>{
      return item.appointment_date===appointment_date && item.appointment_time===appointment_time
    })
    return data
  }
}

export default Utils
