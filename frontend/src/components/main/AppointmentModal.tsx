import {
	Box,
	Button,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	Input,
	Textarea,
} from '@chakra-ui/react';
import { useCal3dlyContractMethod } from '../../hooks/useCal3dly';
import DatePicker from 'react-datepicker';
import { Cal3dlyAppointment } from '../../models/Cal3dlyAppointment.model';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	appointment?: Cal3dlyAppointment;
	setAppointment: React.Dispatch<
		React.SetStateAction<Cal3dlyAppointment | undefined>
	>;
}

export default function AppointmentModal(props: Props) {
	const { state: appointmentStatus, send: addAppointment } =
		useCal3dlyContractMethod('addAppointment');
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				bgGradient='linear(135deg, #F05F57 10%, #360940 100%)'
				border='1px'
				borderStyle='solid'
				borderColor='gray.700'
				borderRadius='3xl'
			>
				<AppointmentHeader />
				<AppointmentBody
					appointment={props.appointment}
					setAppointment={props.setAppointment}
					addAppointment={addAppointment}
				/>
			</ModalContent>
		</Modal>
	);
}

function AppointmentHeader() {
	return (
		<>
			<ModalHeader color='white' px={4} fontSize='lg' fontWeight='medium'>
				Appointment Details
			</ModalHeader>
			<ModalCloseButton
				color='white'
				fontSize='sm'
				_hover={{
					color: '#F05F57',
				}}
			/>
		</>
	);
}

interface AptBodyProps {
	appointment?: Cal3dlyAppointment;
	setAppointment: React.Dispatch<
		React.SetStateAction<Cal3dlyAppointment | undefined>
	>;
	addAppointment: (...args: any[]) => Promise<void>;
}

function AppointmentBody(props: AptBodyProps) {
	const [defaultEndTime, setDefaultEndTime] = useState<string>('');
	useEffect(() => {
		let endTime = props.appointment
			? new Date(props.appointment.startTime * 1000)
			: new Date();
		endTime.setMinutes(endTime.getMinutes() + 30);
		setEndTime(props.appointment, props.setAppointment, endTime);
		setDefaultEndTime(endTime.toTimeString().split(' ')[0]);
	}, []);

	return (
		<ModalBody pt={0} px={4}>
			<Box
				borderRadius='3xl'
				border='1px'
				borderStyle='solid'
				borderColor='white'
				px={5}
				pt={4}
				pb={2}
				mb={3}
				overflow=''
			>
				<Flex>
					<Flex mr='2'>
						<Text color='white' fontSize='sm' fontWeight='bold' mr='2'>
							Title
						</Text>
						<Input
							type='text'
							width='auto'
							maxWidth='115px'
							size='xs'
							placeholder='Appointment Title'
							bg='#edf2f7'
							focusBorderColor='#82C6F4'
							onChange={(input) =>
								setAppointmentTitle(
									props.appointment,
									props.setAppointment,
									input.target.value
								)
							}
						/>
					</Flex>
					<Flex>
						<Flex
							flexDir='column'
							color='white'
							fontSize='sm'
							fontWeight='bold'
						>
							<Text mr='2'>Start</Text>
							<Text mr='2' mt='10px'>
								End
							</Text>
						</Flex>
						<Flex flexDir='column'>
							<DatePicker
								selected={
									props.appointment
										? new Date(props.appointment?.startTime * 1000)
										: new Date()
								}
								showTimeInput
								timeInputLabel='Start Time'
								minDate={new Date()}
								dateFormat='MM/dd/yyyy h:mm aa'
								onChange={(date) =>
									setStartTime(props.appointment, props.setAppointment, date)
								}
								fixedHeight
								customInput={
									<Input
										bg='#edf2f7'
										width='100%'
										size='xs'
										focusBorderColor='#82C6F4'
										fontFamily='inherit'
									/>
								}
							/>

							<Input
								mt='5px'
								type='time'
								bg='#edf2f7'
								defaultValue={defaultEndTime}
								focusBorderColor='#82C6F4'
								size='xs'
								onChange={(input) =>
									setEndTime(
										props.appointment,
										props.setAppointment,
										input.target.valueAsDate
									)
								}
							/>
						</Flex>
					</Flex>
				</Flex>
				<Flex flexDir='column' pt='.375rem'>
					<Text color='white' fontSize='sm' fontWeight='bold' mr='2'>
						Appointment Description
					</Text>
					<Textarea
						bgColor='#edf2f7'
						placeholder="What's your meeting about?"
						resize='none'
						focusBorderColor='#82C6F4'
						onChange={(input) =>
							setAppointmentDescription(
								props.appointment,
								props.setAppointment,
								input.target.value
							)
						}
					/>
				</Flex>
			</Box>
			<SubmitButton
				appointment={props.appointment}
				setAppointment={props.setAppointment}
				addAppointment={props.addAppointment}
			/>
		</ModalBody>
	);
}

function SubmitButton(props: AptBodyProps) {
	return (
		<Flex justifyContent='flex-end'>
			<Button
				bg='#591945'
				color='white'
				border='1px solid white'
				boxShadow='dark-lg'
				alignContent='center'
				onClick={() => scheduleAppointment(props)}
				_hover={{
					color: 'black',
					backgroundColor: '#F05F57',
				}}
			>
				Schedule
			</Button>
		</Flex>
	);
}

function scheduleAppointment(props: AptBodyProps) {
	const { appointment, setAppointment, addAppointment } = props;
	addAppointment(
		appointment?.owner,
		appointment?.title,
		appointment?.description,
		appointment?.startTime,
		appointment?.endTime
	);
	setAppointment(undefined);
}

function setAppointmentTitle(
	appointment: Cal3dlyAppointment | undefined,
	setAppointment: React.Dispatch<
		React.SetStateAction<Cal3dlyAppointment | undefined>
	>,
	title: string
) {
	if (appointment) {
		let t: Cal3dlyAppointment = JSON.parse(JSON.stringify(appointment));
		t.title = title;
		setAppointment(t);
	}
}

function setStartTime(
	appointment: Cal3dlyAppointment | undefined,
	setAppointment: React.Dispatch<
		React.SetStateAction<Cal3dlyAppointment | undefined>
	>,
	startTime: Date | null
) {
	if (appointment) {
		let t: Cal3dlyAppointment = JSON.parse(JSON.stringify(appointment));
		if (startTime?.getTime()) {
			t.startTime = startTime.getTime() / 1000;
			setAppointment(t);
		}
	}
}

function setEndTime(
	appointment: Cal3dlyAppointment | undefined,
	setAppointment: React.Dispatch<
		React.SetStateAction<Cal3dlyAppointment | undefined>
	>,
	endTime: Date | null
) {
	let temp = new Date(appointment ? appointment.startTime * 1000 : 0);
	if (endTime?.getTime()) {
		temp.setHours(endTime.getHours() - 5);
		temp.setMinutes(endTime.getMinutes());
	}

	if (appointment && isValidEndTime(temp)) {
		let t: Cal3dlyAppointment = JSON.parse(JSON.stringify(appointment));
		t.endTime = temp.getTime() / 1000;
		setAppointment(t);
	}
}

function isValidEndTime(endTime: Date | null): boolean {
	if (endTime) {
		return new Date() < endTime;
	}
	return false;
}

function setAppointmentDescription(
	appointment: Cal3dlyAppointment | undefined,
	setAppointment: React.Dispatch<
		React.SetStateAction<Cal3dlyAppointment | undefined>
	>,
	description: string
) {
	if (appointment) {
		let t: Cal3dlyAppointment = JSON.parse(JSON.stringify(appointment));
		t.description = description;
		setAppointment(t);
	}
}
