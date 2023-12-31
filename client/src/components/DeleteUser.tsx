import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import axios from "axios";
import DeleteAlertDialog from "../components/Modal/deleteModal";
import { User } from "../interfaces/User";
import UserContext from "./contexts/userContext";
import { fetchData } from "../apiCalls/fetchData";

interface Props {
  user: User;
}

function DeleteUser(props: Props) {
  const { users, setUsers } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleDelete = (user: User) => {
    const path = "http://localhost:3000/api/users/delete";
    axios
      .delete(path + `/${user._id}`)
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
      <Button size={"xs"} onClick={() => setIsOpen(true)}>
        <DeleteIcon />
      </Button>
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
