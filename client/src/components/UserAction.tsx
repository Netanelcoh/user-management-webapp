import { Stack } from "@chakra-ui/react";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

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

function UserAction(props: Props) {
  return (
    <Stack spacing={2} direction="row" align="center">
      <EditUser
        user={props.user}
        handleEditUser={props.handleEditUser}
      ></EditUser>
      <DeleteUser
        user={props.user}
        handleDeleteUser={props.handleDeleteUser}
      ></DeleteUser>
    </Stack>
  );
}

export default UserAction;
