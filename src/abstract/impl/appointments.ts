import * as t from '../api/appointments/types'
import { Api } from '../models'

async function createAppointment(request: Api.CreateAppointment | undefined): Promise<t.CreateAppointmentResponse> {
	throw 'Unimplemented'
}


const api: t.AppointmentsApi = {
	createAppointment,
}

export default api
