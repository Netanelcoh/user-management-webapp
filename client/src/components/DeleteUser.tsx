import { Button } from "@chakra-ui/react";
import { useState } from "react";
import DeleteAlertDialog from "../utils/Modal/deleteModal";

interface User {
  name: string;
  email: string;
  userId: number;
}

interface Props {
  user: User;
  handleDeleteUser: (user: User) => void;
}

function DeleteUser(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleDelete = (user: User) => {
    console.log(user);
    props.handleDeleteUser(user);
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>delete</Button>
      {isOpen && (
        <DeleteAlertDialog
          isOpen={true}
          user={props.user}
          handleDelete={handleDelete}
          onClose={onClose}
        ></DeleteAlertDialog>
      )}
    </div>
  );
}

export default DeleteUser;
