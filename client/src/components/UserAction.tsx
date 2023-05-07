import { Stack } from "@chakra-ui/react";
import EditUser from "./EditUser";

interface User {
  name: string;
  email: string;
}

interface Props {
  user: User;
}

function UserAction({ user }: Props) {
  return (
    <Stack spacing={2} direction="row" align="center">
      <EditUser user={user}></EditUser>
    </Stack>
  );
}

export default UserAction;
