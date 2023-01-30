import {
  CreateUser201Response,
  CreateUser404Response,
  CreateUserResponse,
  UsersApi,
} from "../../../dist/api/users/types"
import { Api } from "../../../dist/models"
import { connection } from "../../dbConnection"
import Utils from "../../utils/utils"

class User implements UsersApi {
  createUser(
    request: Api.CreateUser | undefined
  ): Promise<CreateUserResponse> {
    return new Promise<CreateUserResponse>(async(resolve, reject) => {
      console.log("request", request)
      if (request?.userEmail ===""|| request?.userName ==="" || request?.userPassword ==="") {
        let res = <CreateUser404Response>{
          status: 404,
          body: {
            message: "Please Provide user details correctly",
          },
        }
        return resolve(res)
      }
      let result =await Utils.checkEmailExists(request?.userEmail)
        if(result[0]["COUNT(*)"]>0){
          let res = <CreateUser404Response>{
            status: 404,
            body: {
              message: "Email already exists",
            },
          }
          return resolve(res)
        }
      try {
        let id = Math.random().toString(20).substring(2, 20).toUpperCase()
        let token = Utils.generateToken(id,"HMS")
        let hashedPassword = await Utils.hashPassword(request?.userPassword)
        console.log("hashedPassword-😅",hashedPassword);
        
        let values = {
          id,
          u_name: request?.userName,
          u_email: request?.userEmail,
          u_password: hashedPassword,
          created_at: new Date()
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-"),
          token,
        }
       connection.query(`INSERT INTO users set ?`, values, (err, result) => {
          if (err) throw err
          console.log(result)
          let res = <CreateUser201Response>{
            status: 201,
            body:{
               message:"Successfully user created"  
            }
          }
          return resolve(res)
        })
        connection.end()
      } catch (err) {
        let res = <CreateUser404Response>{
          status: 404,
          body: {
            message: "Something went wrong!",
          },
        }
        return resolve(res)
      }
    })
  }
}

export default User