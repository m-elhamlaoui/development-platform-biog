import Student from "./Student";
import School from "./School";
import Event from "./Event";
import User from "./User";

interface Club {
  id: string;
  clubName: string;
  clubLogo: string;
  clubDescription: string;
  clubBanner: string;
  clubRating: number;
  ratingCount: number;
  students: Student[];
  events: Event[];
  school: School;
  user: User;
  createdAt: Date;
}

export default Club;
