import { Tr, Td } from "@chakra-ui/react";
import UserAction from "./UserAction";
import { User } from "../interfaces/User";

interface Props {
  user: User;
}

function UserRow(props: Props) {
  return (
    <Tr>
      <Td>{props.user.name}</Td>
      <Td>{props.user.email}</Td>
      <Td>
        <UserAction user={props.user}></UserAction>
      </Td>
    </Tr>
  );
}

export default UserRow;
