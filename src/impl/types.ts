import { AppointmentsApi } from "../abstract/api/appointments/types";
import { DoctorApi } from "../abstract/api/doctor/types";
import { UserApi } from "../abstract/api/user/types";
import { UsersApi } from "../abstract/api/users/types";
import { ApiImplementation } from "../abstract/types";
import Appointments from "./appointments/types";
import Doctor from "./doctor/types";
import User from "./user/types";
import Users from "./users/types";

export class apiImpl implements ApiImplementation{
    appointments: AppointmentsApi= new Appointments;
    doctor: DoctorApi = new Doctor
    user: UserApi = new User
    users: UsersApi = new Users
}