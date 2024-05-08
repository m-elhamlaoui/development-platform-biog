import { Role } from "./Role";
import School from "./School";

interface Admin {
  id: string;
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
  createdAt: Date;
  school: School;
}

export default Admin;
