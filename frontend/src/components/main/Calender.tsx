import { FC, useEffect, useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
	useGetAppointments,
	useCal3dlyContractMethod,
} from '../../hooks/useCal3dly';
import { useEthers } from '@usedapp/core';
import { Address } from '../../App';
import { useDisclosure } from '@chakra-ui/react';
import AppointmentModal from './AppointmentModal';
import { Cal3dlyAppointment } from '../../models/Cal3dlyAppointment.model';

interface Props {
	owner: Address;
}

export const Calendar: FC<Props> = ({ owner }) => {
	const { account } = useEthers();
	const rawApts = useGetAppointments(owner);
	const { state: appointmentStatus, send: addAppointment } =
		useCal3dlyContractMethod('addAppointment');
	const [apts, setApts] = useState<EventInput[]>(formatApts(rawApts, owner));
	const [selectedDate, setSelectedDate] = useState<
		Cal3dlyAppointment | undefined
	>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	// useEffect(() => {
	// 	addAppointment(
	// 		owner,
	// 		'Test',
	// 		'blank',
	// 		new Date('April 6, 2022 15:30:00').getTime() / 1000,
	// 		new Date('April 6, 2022 16:00:00').getTime() / 1000
	// 	);
	// }, []);

	// useEffect(() => {
	// 	console.log(appointmentStatus);
	// }, [appointmentStatus]);

	// useEffect(() => {
	// 	console.log(apts);
	// }, [apts]);

	useEffect(() => {
		if (rawApts) {
			setApts(formatApts(rawApts, owner));
		}
	}, [rawApts]);

	const schedulerData = [
		{
			start: '2022-04-07T09:45',
			end: '2022-04-07T11:00',
			title: 'Dogecoin Integration',
		},
		{
			start: '2022-04-09T12:00',
			end: '2022-04-09T13:30',
			title: 'Test',
		},
	];

	return (
		<>
			<div className='calendar-container'>
				<div className='calendar'>
					<FullCalendar
						headerToolbar={false}
						allDaySlot={false}
						plugins={[timeGridPlugin, interactionPlugin]}
						initialView='timeGridWeek'
						height={'auto'}
						slotMinTime='09:00'
						slotMaxTime='20:00'
						dateClick={(date) => {
							console.log(date);
							setSelectedDate(new Cal3dlyAppointment(date.date));
							onOpen();
						}}
						dayCount={5}
						events={[...schedulerData, ...apts]}
					/>
				</div>
			</div>
			<AppointmentModal
				isOpen={isOpen}
				onClose={onClose}
				appointment={selectedDate}
			/>
		</>
	);
};

const formatApts = (rawApts: any[], owner: Address): EventInput[] => {
	return rawApts?.length
		? [
				...rawApts.map((apt: any) => {
					return {
						title: apt.title,
						start: new Date(apt.startTime * 1000),
						end: new Date(apt.endTime * 1000),
						extendedProps: {
							attendees: [apt.attendee, owner],
						},
					};
				}),
		  ]
		: [];
};

const saveAppointment = (aptData: any) => {
	console.log('Saving appointment: ', aptData);
};
