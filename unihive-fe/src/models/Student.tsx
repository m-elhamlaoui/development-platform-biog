import Club from "./Club";
import School from "./School";
import User from "./User";

interface Student {
  id: string;
  createdAt: Date;
  cne: string;
  numApogee: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  clubs: Club[];
  school: School;
  user: User;
}

export default Student;
