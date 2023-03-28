import * as t from '../api/doctor/types'
import { Api } from '../models'

async function createDoctor(request: Api.CreateDoctor | undefined): Promise<t.CreateDoctorResponse> {
	throw 'Unimplemented'
}


const api: t.DoctorApi = {
	createDoctor,
	doctorSign: function (request: Api.DoctorSignRequest | undefined): Promise<t.DoctorSignResponse> {
		throw new Error('Function not implemented.')
	},
	getDoctor: function (id: string | undefined): Promise<t.GetDoctorResponse> {
		throw new Error('Function not implemented.')
	}
}

export default api
