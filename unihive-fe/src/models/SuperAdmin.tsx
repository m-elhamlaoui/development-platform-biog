import User from "./User";

interface SuperAdmin {
  id: string;
  createdAt: Date;
  user: User;
}

export default SuperAdmin;
