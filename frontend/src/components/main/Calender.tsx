import { FC, useEffect } from 'react';
import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useGetAppointments } from '../../hooks/useCal3dly';

interface Props {
	owner: string | null | undefined;
}

export const Calendar: FC<Props> = ({ owner }) => {
	const apts = useGetAppointments(owner);

	useEffect(() => {
		console.log(apts);
	}, [apts]);

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
					dateClick={(date) => console.log(date)}
					dayCount={5}
					events={schedulerData}
				/>
			</div>
		</div>
	);
};

const saveAppointment = (aptData: any) => {
	console.log('Saving appointment: ', aptData);
};
