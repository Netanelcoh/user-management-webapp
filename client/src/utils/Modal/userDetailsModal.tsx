import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { User } from "../../interfaces/User";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  handleSave: (user: User) => void;
  user?: User;
}

function UserDetailsModal(props: Props) {
  const [isError, setIsError] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (emailRef.current?.value === "" || nameRef.current?.value === "") {
      setIsError(true);
      return;
    }

    let user = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      _id: props.user?._id,
    };
    props.handleSave(user);
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                defaultValue={props.user?.name}
                ref={nameRef}
                type="text"
                size="sm"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                defaultValue={props.user?.email}
                ref={emailRef}
                type="email"
                size="sm"
              />
            </FormControl>

            {isError ? (
              <Text color="#e53e3e">All Fields are required</Text>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button onClick={handleSave} variant="ghost">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserDetailsModal;
