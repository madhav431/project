import {
  CreateUser201Response,
  CreateUser404Response,
  CreateUserResponse,
  UsersApi,
} from "../../abstract/api/users/types"
import { Api } from "../../abstract/models"
import { connection } from "../../dbConnection"
import Utils from "../../utils/utils"
class Users implements UsersApi {
  createUser(
    request: Api.CreateUser | undefined
  ): Promise<CreateUserResponse> {
    return new Promise<CreateUserResponse>(async(resolve, reject) => {
      console.log("request", request)
      if (request?.email ===""|| request?.name ==="" || request?.password ==="") {
        let res = <CreateUser404Response>{
          status: 404,
          body: {
            message: "Please Provide user details correctly",
          },
        }
        return resolve(res)
      }
      let result =await Utils.checkEmailExists(request?.email)
      console.log("result",result);
      
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
        let hashedPassword = await Utils.hashPassword(request?.password)
        console.log("hashedPassword-😅",hashedPassword);
        
        let values = { 
          id,
          name: request?.name,
          email: request?.email,
          password: hashedPassword,
          gender:request?.gender,
          mobile: request?.mobile,
          address: request?.address,
          age: request?.age,
          token:token,
          medical_history: request?.medical_history,
          createdAt: new Date()
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-"),
        }
       connection.query(`INSERT INTO hms_patients set ?`, values, (err, result) => {
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

export default Users
