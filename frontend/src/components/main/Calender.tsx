import { FC, useEffect, useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useGetAppointments } from '../../hooks/useCal3dly';
import { useEthers } from '@usedapp/core';
import { Address } from '../../types';
import { useDisclosure } from '@chakra-ui/react';
import AppointmentModal from './AppointmentModal';
import { Cal3dlyAppointment } from '../../models/Cal3dlyAppointment.model';

interface Props {
	owner: Address;
}

export const Calendar: FC<Props> = ({ owner }) => {
	const { account } = useEthers();
	const rawApts = useGetAppointments(owner);
	const [apts, setApts] = useState<EventInput[]>(formatApts(rawApts, owner));
	const [selectedDate, setSelectedDate] = useState<
		Cal3dlyAppointment | undefined
	>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (rawApts) {
			setApts(formatApts(rawApts, owner));
		}
	}, [rawApts]);

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
							date.date >= new Date()
								? dateClicked(owner, date.date, onOpen, setSelectedDate)
								: null;
						}}
						eventClick={(date) => console.log(date.event)}
						events={[...apts]}
					/>
				</div>
			</div>
			<AppointmentModal
				isOpen={isOpen}
				onClose={onClose}
				appointment={selectedDate}
				setAppointment={setSelectedDate}
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
							owner: owner,
							attendees: [apt.attendee, owner],
						},
					};
				}),
		  ]
		: [];
};

const dateClicked = (
	owner: Address,
	date: Date,
	onOpen: () => void,
	setSelectedDate: (
		value: React.SetStateAction<Cal3dlyAppointment | undefined>
	) => void
) => {
	setSelectedDate(new Cal3dlyAppointment(owner ?? '', date));
	onOpen();
};

const saveAppointment = (aptData: any) => {
	console.log('Saving appointment: ', aptData);
};
