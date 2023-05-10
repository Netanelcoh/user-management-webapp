import { Button } from "@chakra-ui/react";
import { useState } from "react";
import AddOrEditModal from "../utils/Modal/addOrEditModal";

interface User {
  name: string;
  email: string;
  userId: number;
}

interface Props {
  user: User;
  handleEditUser: (user: User) => void;
}

function EditUser(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSave = (user: User) => {
    console.log(user);
    props.handleEditUser(user);
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>edit</Button>
      {isOpen && (
        <AddOrEditModal
          title={"Edit User"}
          isOpen={true}
          user={props.user}
          handleSave={handleSave}
          onClose={onClose}
        ></AddOrEditModal>
      )}
    </div>
  );
}

export default EditUser;
