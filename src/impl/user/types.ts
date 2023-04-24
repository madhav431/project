import {
  GetProfile200Response,
  GetProfile404Response,
  SignIn404Response,
} from "./../../abstract/api/user/types"
import {
  GetProfileResponse,
  SignInResponse,
  UpdatepatientResponse,
  UserApi,
} from "../../abstract/api/user/types"
import { Api } from "../../abstract/models"
import Utils from "../../utils/utils"
import { connection } from "../../dbConnection"

class User implements UserApi {
  getProfile(id: string | undefined): Promise<GetProfileResponse> {
    return new Promise<GetProfileResponse>(async (resolve, reject) => {
      let result1: any = await Utils.get_user_with_id(id)
      console.log(id);
      
      if (result1[0]["COUNT(*)"] < 0) {
        let res = <GetProfile404Response>{
          status: 404,
          body: {
            message: "User not found!",
          },
        }
        return resolve(res)
      }
      let sql = `SELECT * FROM hms_patients WHERE id=${id}`
      connection.query(sql, (err, result: any) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        console.log(result);
        
        let res = <GetProfile200Response>{
          status: 200,
          body: {
            id: result[0].id,
            email: result[0].email,
            gender: result[0].gender,
            name: result[0].name,
            mobile: result[0].mobile,
            address: result[0].address,
            age: result[0].age,
            medical_history: result[0].medical_history,
          },
        }
        return resolve(res)
      })
    })
  }
  updatepatient!: (id: string | undefined) => Promise<UpdatepatientResponse>
  
  signIn(request: Api.SignInRequest | undefined): Promise<SignInResponse> {
    return new Promise<SignInResponse>(async (resolve, reject) => {
      let result = await Utils.checkEmailExists(request?.email)
      if (result[0]["COUNT(*)"] > 0) {
        let sql = `select * from hms_patients where email='${request?.email}'`
        let passwordRef = await Utils.verifyPassword(
          request?.email,
          request?.password
        )
        if (!passwordRef) {
          let res = <SignIn404Response>{
            status: 404,
            body: {
              message: "Password is incorrect!",
            },
          }
          return resolve(res)
        }
        connection.query(sql, (err, result: any) => {
          if (err) throw err
          let res = <SignInResponse>{
            status: 200,
            body: {
              id: result[0].id,
              email: result[0].email,
              token: result[0].token,
            },
          }
          return resolve(res)
        })
      } else {
        let res = <SignIn404Response>{
          status: 404,
          body: {
            message: "Email not exists! please register first",
          },
        }
        return resolve(res)
      }
    })
  }
}

export default User
