export class Cal3dlyAppointment {
	owner: string;
	title?: string;
	description?: string;
	startTime: number;
	endTime?: number;

	constructor(owner: string, dateObj: Date) {
		this.owner = owner;
		this.startTime = dateObj.getTime() / 1000;
	}
}
