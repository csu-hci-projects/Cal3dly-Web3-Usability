import { useState } from 'react';
import { Cal3dlyAppointment } from '../models/Cal3dlyAppointment.model';
import { AppointmentMethods } from '../types';

export default function useAppointment() {
	const [appointment, setAppointment] = useState<
		Cal3dlyAppointment | undefined
	>();

	const appointmentMethods: AppointmentMethods = {
		setAppointmentTitle: (title: string) =>
			setAppointmentTitle(appointment, setAppointment, title),
		setStartTime: (startTime: Date | null) =>
			setStartTime(appointment, setAppointment, startTime),
		setEndTime: (endTime: Date | null) =>
			setEndTime(appointment, setAppointment, endTime),
		setAppointmentDescription: (description: string) =>
			setAppointmentDescription(appointment, setAppointment, description),
		isValid: () => isValid(appointment),
		clearAppointment: () => clearAppointment(setAppointment),
	};

	return { appointment, setAppointment, appointmentMethods };
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

function isValid(appointment: Cal3dlyAppointment | undefined): boolean {
	return !!(
		appointment?.title?.length &&
		appointment?.startTime &&
		appointment?.endTime
	);
}

function clearAppointment(
	setAppointment: React.Dispatch<
		React.SetStateAction<Cal3dlyAppointment | undefined>
	>
) {
	setAppointment(undefined);
}
