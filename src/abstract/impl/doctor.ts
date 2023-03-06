import * as t from '../api/doctor/types'
import { Api } from '../models'

async function createDoctor(request: Api.CreateDoctor | undefined): Promise<t.CreateDoctorResponse> {
	throw 'Unimplemented'
}


const api: t.DoctorApi = {
	createDoctor,
}

export default api
