import { Role } from "./Role";
import Admin from "./Admin";
import SuperAdmin from "./SuperAdmin";
import Student from "./Student";
import Club from "./Club";

interface User {
  id: string;
  role: Role;
  email: string;
  password: string;
  admin?: Admin;
  superAdmin?: SuperAdmin;
  student?: Student;
  club?: Club;
}

export default User;
