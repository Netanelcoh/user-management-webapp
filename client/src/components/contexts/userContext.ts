import React from "react";
import { User } from "../../interfaces/User";

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export default UserContext;
