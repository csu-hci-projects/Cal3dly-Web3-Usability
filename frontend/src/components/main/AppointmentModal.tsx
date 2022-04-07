import {
	Box,
	Button,
	Flex,
	Link,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
} from '@chakra-ui/react';
import { Cal3dlyAppointment } from '../../models/Cal3dlyAppointment.model';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	appointment?: Cal3dlyAppointment;
}

export default function AppointmentModal(props: Props) {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<p>{JSON.stringify(props.appointment)}</p>
			</ModalContent>
		</Modal>
	);
}
