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
} from "@chakra-ui/react";
import { useRef } from "react";

interface newUser {
  name: string;
  email: string;
  userId?: number;
}

interface User {
  name: string;
  email: string;
  userId: number;
}

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  handleSave: (user: User & newUser) => void;
  user?: User;
}

function AddOrEditModal(props: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    let user = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      userId: props.user?.userId || 0,
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
            <Text mb="8px">Name: </Text>
            <Input
              defaultValue={props.user?.name}
              ref={nameRef}
              type="text"
              size="sm"
            />
            <Text mb="8px">Email: </Text>
            <Input
              defaultValue={props.user?.email}
              ref={emailRef}
              type="text"
              size="sm"
            />
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

export default AddOrEditModal;
