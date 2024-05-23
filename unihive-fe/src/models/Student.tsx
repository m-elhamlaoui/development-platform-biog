import Club from "./Club";
import { Role } from "./Role";
import School from "./School";

interface Student {
  id: string;
  createdAt: Date;
  cne: string;
  numApogee: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  profileImage: string;
  clubs: Club[];
  school: School;
}

export default Student;
