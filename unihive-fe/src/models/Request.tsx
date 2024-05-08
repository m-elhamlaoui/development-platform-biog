import Club from "./Club";
import { Role } from "./Role";
import School from "./School";

interface Request {
  id: string;
  createdAt: Date;
  cne: string;
  numApogee: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  schoolCard: string;
}

export default Request;
