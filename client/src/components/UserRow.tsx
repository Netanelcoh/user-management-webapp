import { Tr, Td } from "@chakra-ui/react";
import UserAction from "./UserAction";

interface User {
  name: string;
  email: string;
}

interface Props {
  user: User;
}

function UserRow({ user }: Props) {
  return (
    <Tr>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>
        <UserAction user={user}></UserAction>
      </Td>
    </Tr>
  );
}

export default UserRow;
