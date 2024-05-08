import Student from "./Student";
import School from "./School";
import Event from "./Event";
import { Role } from "./Role";

interface Club {
  id: string;
  clubName: string;
  email: string;
  password: string;
  role: Role;
  clubLogo: string;
  clubDescription: string;
  clubBanner: string;
  clubRating: number;
  ratingCount: number;
  students: Student[];
  events: Event[];
  school: School;
  createdAt: Date;
}

export default Club;
