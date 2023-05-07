import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import UserRow from "./UserRow";
import AddModal from "../utils/Modal/addModal";

interface User {
  name: string;
  email: string;
}

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [addButtonIsClicked, setAddButtonIsClicked] = useState(false);

  const rows: JSX.Element[] = [];

  useEffect(() => {
    const users: User[] = [];
    const controller = new AbortController();
    let isMounted = true;

    function fetchData() {
      axios
        .get("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal,
        })
        .then((res) => {
          res.data.forEach((user: User) =>
            users.push({ name: user.name, email: user.email })
          );
        })
        .then(() => {
          if (isMounted) setUsers(users);
        });
    }
    fetchData();

    return () => {
      controller.abort();
      isMounted = false;
    };
  }, []);

  users.forEach((user, index) => {
    rows.push(<UserRow key={index} user={user}></UserRow>);
  });

  const onClickAddButton = () => {
    setAddButtonIsClicked(true);
  };

  const onCloseAddButton = () => {
    setAddButtonIsClicked(false);
  };

  return (
    <div>
      {addButtonIsClicked ? (
        <AddModal onCloseAddButton={onCloseAddButton} />
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>
                  <Button onClick={onClickAddButton} colorScheme="blue">
                    Add
                  </Button>
                </Th>
              </Tr>
            </Thead>
            <Tbody>{rows}</Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default UserTable;
