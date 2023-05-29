import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import UserRow from "./UserRow";
import AddUser from "./AddUser";
import { fetchData } from "../apiCalls/fetchData";
import { User } from "../interfaces/User";
import UserContext from "./contexts/userContext";

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  const usersRef = useRef(users);
  usersRef.current = users;

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const data = await fetchData();
      if (isMounted) setUsers(data);
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>
                <AddUser />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <UserRow key={index} user={user}></UserRow>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </UserContext.Provider>
  );
}

export default UserTable;

// const dummyUsers = [
//   { email: "Sincere@april.biz", name: "Leanne Graham" },
//   { email: "Shanna@melissa.tv", name: "Ervin Howell" },
//   { email: "Nathan@yesenia.net", name: "Clementine Bau" },
//   { email: "Julianne.OConner@kory.org", name: "Patricik" },
//   { email: "Lucio_Hettinger@annie.ca", name: "Chelsey" },
// ];
