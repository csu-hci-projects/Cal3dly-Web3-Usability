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
	useToast,
	Tooltip,
} from '@chakra-ui/react';
import { useCal3dlyContractMethod } from '../../../hooks/useCal3dly';
import DatePicker from 'react-datepicker';
import { Cal3dlyAppointment } from '../../../models/Cal3dlyAppointment.model';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import {
	shortenAddress,
	TransactionState,
	TransactionStatus,
	useEthers,
} from '@usedapp/core';
import { Address, AppointmentMethods } from '../../../types';
import {
	FaCheckCircle,
	FaInfoCircle,
	FaExclamationCircle,
} from 'react-icons/fa';
import { Toast } from '../Toast';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	appointment?: Cal3dlyAppointment;
	appointmentMethods: AppointmentMethods;
}

export default function AppointmentModal(props: Props) {
	const [readOnly, setReadOnly] = useState<boolean>(
		props.appointmentMethods.isValid()
	);
	const toast = useToast();
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
		setReadOnly(props.appointmentMethods.isValid());
	}, [props.isOpen]);

	useEffect(() => {
		if (isValidStatus(appointmentStatus.status)) {
			evaluateAddToast(appointmentStatus, toast);
		}
	}, [appointmentStatus]);
	useEffect(() => {
		if (isValidStatus(cancelledAppointmentStatus.status)) {
			evaluateCancelToast(cancelledAppointmentStatus, toast);
		}
	}, [cancelledAppointmentStatus]);
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
					appointmentMethods={props.appointmentMethods}
					appointment={props.appointment}
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
	addAppointment: (...args: any[]) => Promise<void>;
	cancelAppointment: (...args: any[]) => Promise<void>;
	onClose: () => void;
	readOnly: boolean;
	account: Address;
	appointmentMethods: AppointmentMethods;
}

function AppointmentBody(props: AptBodyProps) {
	const [defaultEndTime, setDefaultEndTime] = useState<any>(
		props.readOnly
			? new Date(props.appointment?.endTime || 0 * 1000)
			: undefined
	);
	useEffect(() => {
		if (!props.readOnly) {
			let endTime = props.appointment
				? new Date(props.appointment.startTime * 1000)
				: new Date();
			endTime.setMinutes(endTime.getMinutes() + 30);
			props.appointmentMethods.setEndTime(endTime);
			setDefaultEndTime(endTime);
		}
	}, [props.appointment?.startTime]);

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
								props.appointmentMethods.setAppointmentTitle(input.target.value)
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
								showTimeSelect
								disabled={props.readOnly}
								minDate={new Date()}
								minTime={getMinTime(
									new Date((props.appointment?.startTime || 0) * 1000)
								)}
								maxTime={getMaxTime()}
								dateFormat='MM/dd/yyyy h:mm aa'
								onChange={(date) => props.appointmentMethods.setStartTime(date)}
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
								selected={
									props.readOnly &&
									props.appointment &&
									props.appointment.endTime
										? new Date(props.appointment.endTime * 1000)
										: undefined
								}
								showTimeSelect
								showTimeSelectOnly
								value={printDate(props.appointment?.endTime) ?? ''}
								disabled={props.readOnly}
								minTime={defaultEndTime}
								maxTime={getMaxTime()}
								dateFormat='MM/dd/yyyy h:mm aa'
								onChange={(date) =>
									!props.readOnly
										? props.appointmentMethods.setEndTime(date)
										: null
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
							props.appointmentMethods.setAppointmentDescription(
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
	const { appointment, readOnly, appointmentMethods } = props;
	return (
		<Flex justifyContent='flex-end'>
			{readOnly ? (
				<Tooltip
					hasArrow
					label={`It's too late to cancel this appointment.`}
					fontWeight='bold'
					shouldWrapChildren
					isDisabled={!isCanacelable(appointment?.startTime)}
				>
					<Button
						bg='#F05F57'
						color='white'
						border='1px solid white'
						boxShadow='dark-lg'
						alignContent='center'
						disabled={isCanacelable(appointment?.startTime)}
						onClick={() => cancelAppointment(props)}
						_hover={{
							backgroundColor: '#591945',
						}}
					>
						Cancel Appointment
					</Button>
				</Tooltip>
			) : (
				<Tooltip
					hasArrow
					label={`Your appointment needs a title, start time and end time.`}
					fontWeight='bold'
					shouldWrapChildren
					isDisabled={appointmentMethods.isValid()}
				>
					<Button
						bg='#591945'
						color='white'
						border='1px solid white'
						boxShadow='dark-lg'
						alignContent='center'
						disabled={!appointmentMethods.isValid()}
						onClick={() => scheduleAppointment(props)}
						_hover={{
							color: 'black',
							backgroundColor: '#F05F57',
						}}
					>
						Schedule
					</Button>
				</Tooltip>
			)}
		</Flex>
	);
}

function isCanacelable(startTime: number | undefined): boolean {
	return (startTime || 0) < new Date().getTime() / 1000;
}

function getOtherAttendee(account: Address, attendees: Address[]): string {
	const otherAttendees = attendees.filter((attendee) => attendee !== account);
	return otherAttendees.length && otherAttendees[0]
		? shortenAddress(otherAttendees[0])
		: 'yourself';
}

function scheduleAppointment(props: AptBodyProps) {
	const { appointment, appointmentMethods, addAppointment, onClose } = props;
	addAppointment(
		appointment?.owner,
		appointment?.title,
		appointment?.description || '',
		appointment?.startTime,
		appointment?.endTime
	);
	appointmentMethods.clearAppointment();
	onClose();
}

function cancelAppointment(props: AptBodyProps) {
	const {
		account,
		appointment,
		cancelAppointment,
		appointmentMethods,
		onClose,
	} = props;
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
		appointmentMethods.clearAppointment();
		onClose();
	}
}

function getMinTime(startTime: Date): Date {
	let today = new Date();
	if (
		startTime.getDate() === today.getDate() &&
		startTime.getMonth() === today.getMonth() &&
		startTime.getFullYear() === today.getFullYear()
	) {
		if (today.getHours() < 9) {
			today.setHours(9);
			today.setMinutes(0);
			return today;
		}
		return today;
	}
	today.setHours(9);
	today.setMinutes(0);
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
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		const strTime =
			month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}
}

function evaluateAddToast(appointmentStatus: TransactionStatus, toast: any) {
	switch (appointmentStatus.status) {
		case 'Mining':
			toast({
				render: () => (
					<Toast
						title={'Confirming your appointment on the blockchain!'}
						mode={'info'}
						info={
							'Your appointment is being confirmed on the blockchain. Check its status'
						}
						link={`https://goerli.etherscan.io/tx/${appointmentStatus.transaction?.hash}`}
						icon={FaInfoCircle}
					/>
				),
			});
			break;
		case 'Success':
			toast({
				render: () => (
					<Toast
						title={'Your appointment has been made!'}
						mode={'success'}
						info={
							'Your appointment has been confirmed on the blockchain. View your confirmation'
						}
						link={`https://goerli.etherscan.io/tx/${appointmentStatus.transaction?.hash}`}
						icon={FaCheckCircle}
					/>
				),
			});
			break;
		case 'Exception':
		case 'Fail':
			toast({
				render: () => (
					<Toast
						title={'Failed to make your appointment!'}
						mode={'error'}
						info={
							'Your appointment could not be confirmed on the blockchain. Please try again.'
						}
						link={``}
						icon={FaExclamationCircle}
					/>
				),
			});
			break;
		default:
			break;
	}
}

function evaluateCancelToast(
	cancelledAppointmentStatus: TransactionStatus,
	toast: any
) {
	switch (cancelledAppointmentStatus.status) {
		case 'Mining':
			toast({
				render: () => (
					<Toast
						title={'Canceling your appointment on the blockchain!'}
						mode={'info'}
						info={
							'Your appointment is being cancelled on the blockchain. Check its status'
						}
						link={`https://goerli.etherscan.io/tx/${cancelledAppointmentStatus.transaction?.hash}`}
						icon={FaInfoCircle}
					/>
				),
			});
			break;
		case 'Success':
			toast({
				render: () => (
					<Toast
						title={'Your appointment has been cancelled!'}
						mode={'success'}
						info={
							'Your appointment has been cancelled on the blockchain. View your confirmation'
						}
						link={`https://goerli.etherscan.io/tx/${cancelledAppointmentStatus.transaction?.hash}`}
						icon={FaCheckCircle}
					/>
				),
			});
			break;
		case 'Exception':
		case 'Fail':
			toast({
				render: () => (
					<Toast
						title={'Failed to cancel your appointment!'}
						mode={'error'}
						info={
							'Your appointment could not be cancelled on the blockchain. Please try again.'
						}
						link={``}
						icon={FaExclamationCircle}
					/>
				),
			});
			break;
		default:
			break;
	}
}

function isValidStatus(status: TransactionState) {
	return status !== 'None' && status !== 'PendingSignature';
}
