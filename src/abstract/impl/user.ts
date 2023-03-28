import * as t from '../api/user/types'
import { Api } from '../models'

async function signIn(request: Api.SignInRequest | undefined): Promise<t.SignInResponse> {
	throw 'Unimplemented'
}


const api: t.UserApi = {
	signIn,
	getProfile: function (id: string | undefined): Promise<t.GetProfileResponse> {
		throw new Error('Function not implemented.')
	},
	updatepatient: function (id: string | undefined): Promise<t.UpdatepatientResponse> {
		throw new Error('Function not implemented.')
	}
}

export default api
