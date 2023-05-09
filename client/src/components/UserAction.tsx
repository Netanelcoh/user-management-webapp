import { Stack } from "@chakra-ui/react";
import EditUser from "./EditUser";

interface User {
  name: string;
  email: string;
  userId: number;
}

interface Props {
  user: User;
  handleEditUser: (newUser: User) => void;
}

function UserAction({ user, handleEditUser }: Props) {
  return (
    <Stack spacing={2} direction="row" align="center">
      <EditUser user={user} handleEditUser={handleEditUser}></EditUser>
    </Stack>
  );
}

export default UserAction;
