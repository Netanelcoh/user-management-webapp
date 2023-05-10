import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface User {
  name: string;
  email: string;
  userId: number;
}

interface Props {
  user: User;
  isOpen: boolean;
  handleDelete: (user: User) => void;
  onClose: () => void;
}

function DeleteAlertDialog(props: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleOnClick = () => {
    props.handleDelete(props.user);
  };
  return (
    <>
      <AlertDialog
        isOpen={props.isOpen}
        onClose={props.onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={props.onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleOnClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteAlertDialog;
