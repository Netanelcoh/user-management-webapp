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

interface Props {
  user: User;
  isOpen: boolean;
  onSaveChanges: (user: User) => void;
  onClose: () => void;
}

interface User {
  name: string;
  email: string;
  userId: number;
}

function EditModal({ isOpen, user, onClose, onSaveChanges }: Props) {
  //const [user, setUser] = useState<User>({ name: "", email: "" });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSaveChanges({
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      userId: user.userId,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="8px">Name: </Text>
            <Input
              defaultValue={user.name}
              ref={nameRef}
              type="text"
              size="sm"
            />
            <Text mb="8px">Email: </Text>
            <Input
              defaultValue={user.email}
              ref={emailRef}
              type="text"
              size="sm"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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

export default EditModal;
