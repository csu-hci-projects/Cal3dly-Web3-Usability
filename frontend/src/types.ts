export type Address = string | null | undefined;

export type Cal3dlyContractMethodNames =
	| 'getAppointments'
	| 'addAppointment'
	| 'cancelAppointment(string,address)'
	| 'cancelAppointment(address,string)';

export type ToasterModes = 'success' | 'error' | 'info';
