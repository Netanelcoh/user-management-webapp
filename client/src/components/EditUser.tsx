import { Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import axios from "axios";
import UserDetailsModal from "../utils/Modal/userDetailsModal";
import { User } from "../interfaces/User";
import { fetchData } from "../apiCalls/fetchData";
import UserContext from "./contexts/userContext";

interface Props {
  user: User;
}

function EditUser(props: Props) {
  const { users, setUsers } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSave = (user: User) => {
    const path = "http://localhost:3000/api/users/edit";

    axios
      .post(path, { ...user })
      .then(() => {
        fetchData().then((res) => {
          console.log(res);
          setUsers(res);
          setIsOpen(false);
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Button size={"xs"} onClick={() => setIsOpen(true)}>
        <EditIcon />
      </Button>
      {isOpen && (
        <UserDetailsModal
          title={"Edit User"}
          isOpen={true}
          user={props.user}
          handleSave={handleSave}
          onClose={onClose}
        ></UserDetailsModal>
      )}
    </div>
  );
}

export default EditUser;
