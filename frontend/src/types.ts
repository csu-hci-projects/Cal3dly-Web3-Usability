export type Address = string | null | undefined;

export type Cal3dlyContractMethodNames =
	| 'getAppointments'
	| 'addAppointment'
	| 'cancelAppointment(string,address)'
	| 'cancelAppointment(address,string)';

export type ToasterModes = 'success' | 'error' | 'info';

export type AppointmentMethods = {
	setAppointmentTitle: (title: string) => void;
	setStartTime: (startTime: Date | null) => void;
	setEndTime: (endTime: Date | null) => void;
	setAppointmentDescription: (description: string) => void;
	isValid: () => boolean;
	clearAppointment: () => void;
};
