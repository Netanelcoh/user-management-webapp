import { Tr, Td } from "@chakra-ui/react";
import UserAction from "./UserAction";

interface User {
  name: string;
  email: string;
  userId: number;
}

interface Props {
  user: User;
  handleEditUser: (newUser: User) => void;
}

function UserRow({ user, handleEditUser }: Props) {
  //const test = () => console.log(test);
  return (
    <Tr>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>
        <UserAction user={user} handleEditUser={handleEditUser}></UserAction>
      </Td>
    </Tr>
  );
}

export default UserRow;
