import { Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import AddOrEditModal from "../utils/Modal/addOrEditModal";
import { User } from "../interfaces/User";
import axios from "axios";
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
      .then()
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
