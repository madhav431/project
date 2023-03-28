import {
  AppointmentsApi,
  CreateAppointmentResponse,
  CreateAppointment201Response,
  CreateAppointment404Response,
} from "../../abstract/api/appointments/types"
import { Api } from "../../abstract/models"
import { connection } from "../../dbConnection"
import Utils from "../../utils/utils"

class Appointments implements AppointmentsApi {
  createAppointment(
    request: Api.CreateAppointment | undefined
  ): Promise<CreateAppointmentResponse> {
    return new Promise<CreateAppointmentResponse>(async (resolve, reject) => {
      try {
        let createdAt = new Date().toLocaleDateString()
        let id = Math.random().toString(20).substring(2, 20).toUpperCase()
        let values = {
          id,
          doctor_id: request?.doctor_id,
          patient_id: request?.patient_id,
          appointment_date: request?.appointment_date,
          appointment_time: request?.appointment_time,
          created: createdAt.split("/").reverse().join("-"),
          status: "Active",
          fee: "500",
        }
        let sql = `INSERT INTO hms_appointments SET ?`
        connection.query(sql, values, (err, result) => {
          if (err) throw err

          let res = <CreateAppointment201Response>{
            status: 201,
            body: {
              message: "Appointment created successfully",
            },
          }
          return resolve(res)
        })
        connection.end()
      } catch (err) {
        console.error(err)
        let res = <CreateAppointment404Response>{
          status: 404,
          body: {
            message: "Appointment not created",
          },
        }
        return resolve(res)
      }
    })
  }
}
export default Appointments
