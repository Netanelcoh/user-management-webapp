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
import { User } from "../../interfaces/User";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  handleSave: (user: User) => void;
  user?: User;
}

function UserDetailsModal(props: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
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

export default UserDetailsModal;
