import { Button } from "@chakra-ui/react";
import { useState } from "react";
import AddOrEditModal from "../utils/Modal/addOrEditModal";

interface User {
  name: string;
  email: string;
  userId?: number;
}

interface Props {
  onAddNewUser: (newUser: User) => void;
}

function AddUser(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onAddNewUser = (newUser: User) => {
    setIsOpen(false);
    props.onAddNewUser(newUser);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} colorScheme="blue">
        Add
      </Button>
      {isOpen && (
        <AddOrEditModal
          title={"New User"}
          isOpen={true}
          handleSave={onAddNewUser}
          onClose={onClose}
        ></AddOrEditModal>
      )}
    </div>
  );
}

export default AddUser;
