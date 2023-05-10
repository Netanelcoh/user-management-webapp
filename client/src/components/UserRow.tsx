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
  handleDeleteUser: (user: User) => void;
}

function UserRow(props: Props) {
  //const test = () => console.log(test);
  return (
    <Tr>
      <Td>{props.user.name}</Td>
      <Td>{props.user.email}</Td>
      <Td>
        <UserAction
          user={props.user}
          handleEditUser={props.handleEditUser}
          handleDeleteUser={props.handleDeleteUser}
        ></UserAction>
      </Td>
    </Tr>
  );
}

export default UserRow;
