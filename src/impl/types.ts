import { UsersApi } from "../../dist/api/users/types";
import { ApiImplementation } from "../../dist/types";
import User from "./users/types";

export class apiImpl implements ApiImplementation{
    users: UsersApi = new User
    
}