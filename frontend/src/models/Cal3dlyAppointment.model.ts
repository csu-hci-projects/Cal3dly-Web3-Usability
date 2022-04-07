export class Cal3dlyAppointment {
	title?: string;
	description?: string;
	startTime: number;
	endTime?: number;

	constructor(dateObj: Date) {
		this.startTime = dateObj.getTime() / 1000;
	}
}
