import {
  CreateDoctor404Response,
  CreateDoctor201Response,
  DoctorSignResponse,
  DoctorSign200Response,
  GetDoctorResponse,
  GetDoctor404Response,
  GetDoctor500Response,
  GetDoctor200Response
} from "./../../abstract/api/doctor/types"
import {
  CreateDoctorResponse,
  DoctorApi,
} from "../../abstract/api/doctor/types"
import { Api } from "../../abstract/models"
import { connection } from "../../dbConnection"
import Utils from "../../utils/utils"

class Doctor implements DoctorApi {
  getDoctor(id: string | undefined) :Promise<GetDoctorResponse>{
    return new Promise<GetDoctorResponse>(async (resolve, reject) => {
      try{
        let count:any=await Utils._check_doctor_exists_id(id)
        console.log("count",count);
        
        if(count[0]["count(*)"]==0){
          let res=<GetDoctor404Response>{
            status:404,
            body:{
              message:"Doctor not found"
            }
          }
          return resolve(res)
        }
        let sql =`SELECT * FROM hms_doctor WHERE id=${id}`
        connection.query(sql,(err,result:any)=>{
          if(err){
            console.error(err)
            return reject(err)
          }
          let res=<GetDoctor200Response>{
            status:200,
            body:{
              id:result[0].id,
              email:result[0].email,
              name:result[0].name,
              mobile:result[0].mobile,
              specialization:result[0].specialization,
            }
          }
          return resolve(res)
        })
      }catch(err){
        console.log(err)
        let res=<GetDoctor500Response><unknown>{
          status: 404,
          body: {
            message: "Doctor not found"
          }
        }
        return resolve(res)
      }
    })
  }
  doctorSign(
    request: Api.DoctorSignRequest | undefined
  ): Promise<DoctorSignResponse> {
    return new Promise<DoctorSignResponse>(async (resolve, reject) => {
      try {
        let doctor = await Utils._check_doctor_exists(request?.email)
        if (doctor[0]["COUNT(*)"] == 0) {
          let res = <CreateDoctor404Response>{
            status: 404,
            body: {
              message: "Email not found please register",
            },
          }
          return resolve(res)
        }
        let passwordRef = await Utils.verifyDoctorPassword(
          request?.email,
          request?.password
        )
        if (!passwordRef) {
          let res = <CreateDoctor404Response>{
            status: 404,
            body: {
              message: "Password is incorrect",
            },
          }
          return resolve(res)
        }

        if (doctor[0]["COUNT(*)"] > 0) {
          let sql = `select * from hms_doctor where email='${request?.email}'`
          connection.query(sql, (err, result: any) => {
            if (err) {
              console.error(err)
              return reject(err)
            }
            let res = <DoctorSign200Response>{
              status: 200,
              body: {
                id: result[0].id,
                email: result[0].email,
                name: result[0].name,
                mobile: result[0].mobile,
                specialization: result[0].specialization,
              },
            }
            return resolve(res)
          })
        }
      } catch (err) {
        console.log(err)
        let res = <CreateDoctor404Response>{
          status: 404,
          body: {
            message: "Please try again with proper credentials",
          },
        }
        return resolve(res)
      }
    })
  }
  createDoctor(
    request: Api.CreateDoctor | undefined
  ): Promise<CreateDoctorResponse> {
    return new Promise<CreateDoctorResponse>(async (resolve, reject) => {
      let id = Math.random().toString(20).substring(2, 20).toUpperCase()
      let hashedPassword = await Utils.hashPassword(request?.password)

      let doctor = await Utils._check_doctor_exists(request?.email)
      if (doctor[0]["COUNT(*)"] > 0) {
        let res = <CreateDoctor404Response>{
          status: 404,
          body: {
            message: "Email already exists",
          },
        }
        return resolve(res)
      }
      try {
        let values = {
          id,
          name: request?.name,
          email: request?.email,
          password: hashedPassword,
          address: request?.address,
          mobile: request?.mobile,
          specialization: request?.specialization,
        }
        let sql = `INSERT INTO hms_doctor set ?`
        connection.query(sql, values, (err, result) => {
          if (err) throw err
          let res = <CreateDoctor201Response>{
            status: 201,
            body: {
              message: "Doctor Created Successfully",
            },
          }
          return resolve(res)
        })

      } catch (err) {
        console.log(err)
        let res = <CreateDoctor404Response>{
          status: 404,
          body: {
            message: "Something went wrong",
          },
        }
        return resolve(res)
      }
    })
  }
}

export default Doctor
