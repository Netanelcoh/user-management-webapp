import { Button } from "@chakra-ui/react";
import EditModal from "../utils/Modal/editModal";
import { useState } from "react";

interface User {
  name: string;
  email: string;
  userId: number;
}

interface Props {
  user: User;
  handleEditUser: (newUser: User) => void;
}

function EditUser({ user, handleEditUser }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSave = (user: User) => {
    console.log(user);
    handleEditUser(user);
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>edit</Button>
      {isOpen && (
        <EditModal
          isOpen={true}
          user={user}
          onSaveChanges={handleSave}
          onClose={onClose}
        ></EditModal>
      )}
    </div>
  );
}

export default EditUser;
