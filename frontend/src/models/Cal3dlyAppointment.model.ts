import { Address } from '../types';

export class Cal3dlyAppointment {
	owner: string;
	title?: string;
	description?: string;
	startTime: number;
	endTime?: number;
	attendees?: Address[];
	constructor(
		owner: string,
		startTime: number,
		endTime?: number,
		title?: string,
		description?: string,
		attendees?: Address[]
	) {
		this.owner = owner;
		this.startTime = startTime;
		this.endTime = endTime;
		this.title = title;
		this.description = description;
		this.attendees = attendees;
	}
}
