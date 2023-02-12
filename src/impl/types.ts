import { UserApi } from "../abstract/api/user/types";
import { UsersApi } from "../abstract/api/users/types";
import { ApiImplementation } from "../abstract/types";
import User from "./user/types";
import Users from "./users/types";

export class apiImpl implements ApiImplementation{
    user: UserApi = new User
    users: UsersApi = new Users
}