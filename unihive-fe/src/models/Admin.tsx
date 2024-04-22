import School from "./School";
import User from "./User";

interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  school: School;
  user: User;
}

export default Admin;
