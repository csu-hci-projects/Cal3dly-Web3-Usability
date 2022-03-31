import {
	ChangeSet,
	EditingState,
	IntegratedEditing,
	ViewState,
} from '@devexpress/dx-react-scheduler';
import {
	AppointmentForm,
	Appointments,
	Scheduler,
	WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import React, { FC } from 'react';

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
			<Scheduler data={schedulerData}>
				<ViewState />
				<EditingState onCommitChanges={saveAppointment} />
				<IntegratedEditing />
				<WeekView startDayHour={8} endDayHour={19} />
				<Appointments />
				<AppointmentForm />
			</Scheduler>
		</div>
	);
};

const saveAppointment = (aptData: ChangeSet) => {
	console.log('Saving appointment: ', aptData);
};
