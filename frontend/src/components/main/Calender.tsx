import { FC } from 'react';
import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Props {}

export const Calendar: FC<Props> = (props) => {
	const schedulerData = [
		{
			startDate: '2022-03-30T09:45',
			endDate: '2022-03-30T11:00',
			title: 'Dogecoin Integration',
		},
		{
			startDate: '2022-03-31T12:00',
			endDate: '2022-03-31T13:30',
			title: 'Test',
		},
	];

	return (
		<div className='calendar'>
			<FullCalendar
				headerToolbar={false}
				allDaySlot={false}
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView='timeGridWeek'
				height={'auto'}
				slotMinTime='09:00'
				slotMaxTime='20:00'
				dateClick={(date) => console.log(date)}
				stickyHeaderDates={true}
			/>
		</div>
	);
};

const saveAppointment = (aptData: any) => {
	console.log('Saving appointment: ', aptData);
};
