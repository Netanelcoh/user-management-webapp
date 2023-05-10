import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserRow from "./UserRow";
import AddUser from "./AddUser";

interface User {
  name: string;
  email: string;
  userId: number;
}

interface newUser {
  name: string;
  email: string;
  userId?: number;
}

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  const usersRef = useRef(users);
  usersRef.current = users;

  useEffect(() => {
    const usersWithId: User[] = [];
    const controller = new AbortController();
    let isMounted = true;

    function fetchData() {
      axios
        .get("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal,
        })
        .then((res) => {
          res.data.forEach((user: User) =>
            usersWithId.push({
              name: user.name,
              email: user.email,
              userId: createNumericId(),
            })
          );
        })
        .then(() => {
          if (isMounted) setUsers(usersWithId);
        });
    }
    fetchData();

    return () => {
      controller.abort();
      isMounted = false;
    };
  }, []);

  const onAddNewUser = (newUser: newUser) => {
    let newUserWithId = {
      ...newUser,
      userId: createNumericId(),
    };
    console.log(newUserWithId);
    usersRef.current.push(newUserWithId);
    setUsers([...usersRef.current]);
  };

  const handleEditUser = (newUser: User) => {
    let usersArr = usersRef.current;
    let userIndex = usersArr.findIndex(
      (user) => user.userId === newUser.userId
    );
    userIndex !== -1 ? (usersArr[userIndex] = newUser) : null;
    setUsers([...usersArr]);
  };

  const handleDeleteUser = (currentUser: User) => {
    let usersArr = usersRef.current;
    let newUserList = usersArr.filter(
      (user) => user.userId !== currentUser.userId
    );
    setUsers([...newUserList]);
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>
                <AddUser onAddNewUser={onAddNewUser} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <UserRow
                key={index}
                user={user}
                handleEditUser={handleEditUser}
                handleDeleteUser={handleDeleteUser}
              ></UserRow>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserTable;

function createNumericId() {
  // Get the current timestamp in milliseconds
  const timestamp = Date.now();

  // Generate a random number between 0 and 9999
  const randNum = Math.floor(Math.random() * 10000);

  // Combine the timestamp and random number to create a unique ID
  const uniqueId = parseInt(`${timestamp}${randNum}`);

  return uniqueId;
}

// const dummyUsers = [
//   { email: "Sincere@april.biz", name: "Leanne Graham" },
//   { email: "Shanna@melissa.tv", name: "Ervin Howell" },
//   { email: "Nathan@yesenia.net", name: "Clementine Bau" },
//   { email: "Julianne.OConner@kory.org", name: "Patricik" },
//   { email: "Lucio_Hettinger@annie.ca", name: "Chelsey" },
// ];
