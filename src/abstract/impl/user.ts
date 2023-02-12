import * as t from '../api/user/types'
import { Api } from '../models'

async function signIn(request: Api.SignInRequest | undefined): Promise<t.SignInResponse> {
	throw 'Unimplemented'
}


const api: t.UserApi = {
	signIn,
}

export default api
