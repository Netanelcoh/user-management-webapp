import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import axios from "axios";
import UserDetailsModal from "../utils/Modal/userDetailsModal";
import { User } from "../interfaces/User";
import { fetchData } from "../apiCalls/fetchData";
import UserContext from "./contexts/userContext";

function AddUser() {
  const { users, setUsers } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onAddNewUser = (newUser: User) => {
    const path = "http://localhost:3000/api/users/add";

    axios
      .post(path, {
        ...newUser,
      })
      .then(() => {
        fetchData().then((res) => {
          setUsers(res);
          setIsOpen(false);
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Button size={"xs"} onClick={() => setIsOpen(true)} colorScheme="blue">
        <AddIcon />
      </Button>
      {isOpen && (
        <UserDetailsModal
          title={"New User"}
          isOpen={true}
          handleSave={onAddNewUser}
          onClose={onClose}
        ></UserDetailsModal>
      )}
    </div>
  );
}

export default AddUser;
