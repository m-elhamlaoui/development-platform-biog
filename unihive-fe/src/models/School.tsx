import Admin from "./Admin";
import Club from "./Club";
import Student from "./Student";

interface School {
  id: string;
  createdAt: Date;
  schoolName: string;
  schoolCity: string;
  schoolAddress: string;
  admin: Admin;
  clubs: Club[];
  students: Student[];
}

export default School;
