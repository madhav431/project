import * as t from '../api/users/types'
import { Api } from '../models'

async function createUser(request: Api.CreateUser | undefined): Promise<t.CreateUserResponse> {
	throw 'Unimplemented'
}


const api: t.UsersApi = {
	createUser,
}

export default api
