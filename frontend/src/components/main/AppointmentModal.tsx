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
import { shortenAddress, useEthers } from '@usedapp/core';
import { Address } from '../../types';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	appointment?: Cal3dlyAppointment;
	setAppointment: React.Dispatch<
		React.SetStateAction<Cal3dlyAppointment | undefined>
	>;
}

export default function AppointmentModal(props: Props) {
	const [readOnly, setReadOnly] = useState<boolean>(
		isValidAppointment(props.appointment)
	);
	useEffect(() => {
		setReadOnly(isValidAppointment(props.appointment));
	}, [props.isOpen]);
	const { account } = useEthers();
	const { state: appointmentStatus, send: addAppointment } =
		useCal3dlyContractMethod('addAppointment');
	const { state: cancelledAppointmentStatus, send: cancelAppointment } =
		useCal3dlyContractMethod(
			account === props.appointment?.owner
				? 'cancelAppointment(string,address)'
				: 'cancelAppointment(address,string)'
		);
	useEffect(() => {
		console.log(appointmentStatus);
	}, [appointmentStatus]);
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				bgGradient='linear(135deg, #F05F57 10%, #360940 100%)'
				border='1px'
				borderColor='edf2f7'
				borderRadius='3xl'
			>
				<AppointmentHeader />
				<AppointmentBody
					appointment={props.appointment}
					setAppointment={props.setAppointment}
					addAppointment={addAppointment}
					cancelAppointment={cancelAppointment}
					onClose={props.onClose}
					readOnly={readOnly}
					account={account}
				/>
			</ModalContent>
		</Modal>
	);
}

function AppointmentHeader() {
	return (
		<>
			<ModalHeader color='white' px={4} fontSize='lg' fontWeight='bold'>
				Appointment Details
			</ModalHeader>
			<ModalCloseButton
				color='white'
				fontSize='sm'
				_focus={{
					outlineColor: '#82C6F4',
				}}
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
	cancelAppointment: (...args: any[]) => Promise<void>;
	onClose: () => void;
	readOnly: boolean;
	account: Address;
}

function AppointmentBody(props: AptBodyProps) {
	const [defaultEndTime, setDefaultEndTime] = useState<Date>();
	const lowerBound = new Date();
	lowerBound.setHours(8);
	lowerBound.setMinutes(0);
	useEffect(() => {
		let endTime = props.appointment
			? new Date(props.appointment.startTime * 1000)
			: new Date();
		endTime.setMinutes(endTime.getMinutes() + 30);
		setEndTime(props.appointment, props.setAppointment, endTime);
		setDefaultEndTime(endTime);
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
							defaultValue={props.appointment?.title}
							disabled={props.readOnly}
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
								disabled={props.readOnly}
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
							<DatePicker
								selected={defaultEndTime}
								showTimeSelect
								showTimeSelectOnly
								value={
									printDate(props.appointment?.endTime) ??
									printDate((defaultEndTime?.getTime() || 0) / 1000)
								}
								disabled={props.readOnly}
								minTime={getMinTime()}
								maxTime={getMaxTime()}
								dateFormat='MM/dd/yyyy h:mm aa'
								onChange={(date) =>
									setEndTime(props.appointment, props.setAppointment, date)
								}
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
						defaultValue={props.appointment?.description}
						disabled={props.readOnly}
						onChange={(input) =>
							setAppointmentDescription(
								props.appointment,
								props.setAppointment,
								input.target.value
							)
						}
					/>
				</Flex>
				{props.appointment?.attendees?.length && props.readOnly && (
					<Flex width='100%' pt='2' justifyContent='center'>
						<Text color='white' fontSize='md' fontWeight='bold'>
							Meeting between you and{' '}
							{getOtherAttendee(props.account, props.appointment.attendees)}.
						</Text>
					</Flex>
				)}
			</Box>
			<SubmitButton {...props} />
		</ModalBody>
	);
}

function SubmitButton(props: AptBodyProps) {
	const { appointment, readOnly } = props;
	return (
		<Flex justifyContent='flex-end'>
			{readOnly ? (
				<Button
					bg='#F05F57'
					color='white'
					border='1px solid white'
					boxShadow='dark-lg'
					alignContent='center'
					disabled={
						(props.appointment?.startTime || 0) < new Date().getTime() / 1000
					}
					onClick={() => cancelAppointment(props)}
					_hover={{
						backgroundColor: '#591945',
					}}
				>
					Cancel Appointment
				</Button>
			) : (
				<Button
					bg='#591945'
					color='white'
					border='1px solid white'
					boxShadow='dark-lg'
					alignContent='center'
					disabled={!isValidAppointment(appointment)}
					onClick={() => scheduleAppointment(props)}
					_hover={{
						color: 'black',
						backgroundColor: '#F05F57',
					}}
				>
					Schedule
				</Button>
			)}
		</Flex>
	);
}

function isValidAppointment(
	appointment: Cal3dlyAppointment | undefined
): boolean {
	return !!(
		appointment?.title?.length &&
		appointment?.startTime &&
		appointment?.endTime
	);
}

function getOtherAttendee(account: Address, attendees: Address[]): string {
	const otherAttendees = attendees.filter((attendee) => attendee !== account);
	return otherAttendees.length && otherAttendees[0]
		? shortenAddress(otherAttendees[0])
		: 'yourself';
}

function scheduleAppointment(props: AptBodyProps) {
	const { appointment, setAppointment, addAppointment, onClose } = props;
	addAppointment(
		appointment?.owner,
		appointment?.title,
		appointment?.description || '',
		appointment?.startTime,
		appointment?.endTime
	);
	setAppointment(undefined);
	onClose();
}

function cancelAppointment(props: AptBodyProps) {
	const { account, appointment, cancelAppointment, setAppointment, onClose } =
		props;
	if (appointment) {
		if (account === appointment.owner) {
			cancelAppointment(
				appointment.title,
				appointment.attendees?.filter(
					(attendee) => attendee !== appointment.owner
				)[0] ?? appointment.owner
			);
		} else {
			cancelAppointment(appointment.owner, appointment.title);
		}
		setAppointment(undefined);
		onClose();
	}
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
	if (appointment && isValidEndTime(endTime, appointment.startTime)) {
		let t: Cal3dlyAppointment = JSON.parse(JSON.stringify(appointment));
		t.endTime = (endTime?.getTime() || 0) / 1000;
		setAppointment(t);
	}
}

function isValidEndTime(
	endTime: Date | null,
	startTime: number | undefined
): boolean {
	if (endTime && startTime) {
		return new Date() < endTime && new Date(startTime * 1000) < endTime;
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

function getMinTime(): Date {
	let today = new Date();
	if (today.getHours() < 9) {
		today.setHours(9);
		today.setMinutes(0);
		return today;
	}
	return today;
}

function getMaxTime(): Date {
	let today = new Date();
	today.setHours(20);
	today.setMinutes(0);
	return today;
}

function printDate(endTime: number | undefined): string | undefined {
	if (endTime) {
		const date = new Date(endTime * 1000);
		let month: string | number = date.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		const day = date.getDate();
		const year = date.getFullYear();
		let hours = date.getHours();
		let minutes: string | number = date.getMinutes();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		const strTime =
			month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}
}
