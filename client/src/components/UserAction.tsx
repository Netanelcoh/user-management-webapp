import { Stack } from "@chakra-ui/react";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import { User } from "../interfaces/User";

interface Props {
  user: User;
}

function UserAction(props: Props) {
  return (
    <Stack spacing={2} direction="row" align="center">
      <EditUser user={props.user}></EditUser>
      <DeleteUser user={props.user}></DeleteUser>
    </Stack>
  );
}

export default UserAction;
