import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import UserRow from "./UserRow";
import AddUser from "./AddUser";
import { fetchData } from "../apiCalls/fetchData";
import { User } from "../interfaces/User";
import UserContext from "./contexts/userContext";

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [isErrorOccur, setIsErrorOccur] = useState<Boolean>(false);

  const usersRef = useRef(users);
  usersRef.current = users;

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const result = await fetchData();
      if (result.message === "Network Error") {
        setIsErrorOccur(true);
      }
      if (isMounted) setUsers(result);
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return isErrorOccur ? (
    <p>Network Error</p>
  ) : (
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
