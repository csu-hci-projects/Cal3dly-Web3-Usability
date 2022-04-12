import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Cal3dly', () => {
	let Contract, contract: any;
	let owner: any, address1: any, address2: any;

	beforeEach(async () => {
		[owner, address1, address2] = await ethers.getSigners();
		Contract = await ethers.getContractFactory('Cal3dly');
		contract = await Contract.deploy();
		await contract.deployed();
	});

	it('Should add two appointments', async () => {
		const tx = await contract.addAppointment(
			address1.address,
			'Appointment with Professor Ortega',
			'Discussion about Final Project',
			1649505600,
			1649509200
		);
		await tx.wait();

		const tx2 = await contract.addAppointment(
			address1.address,
			'Test Appointment',
			'Test Description',
			1653292800,
			1653294600
		);
		await tx2.wait();

		const appointments = await contract.getAppointments(address1.address);

		expect(appointments.length).to.equal(2);
	});

	it('Should handle different accounts', async () => {
		const tx = await contract.addAppointment(
			address1.address,
			'Appointment with Professor Ortega',
			'Discussion about Final Project',
			1649505600,
			1649509200
		);
		await tx.wait();

		const tx2 = await contract.addAppointment(
			address2.address,
			'Test Appointment',
			'Test Description',
			1653292800,
			1653294600
		);
		await tx2.wait();

		const appointments1 = await contract.getAppointments(address1.address);
		const appointments2 = await contract.getAppointments(address2.address);
		expect(appointments1.length).to.equal(1);
		expect(appointments2.length).to.equal(1);
	});

	it('Should cancel an appointment from attendee', async () => {
		const tx = await contract.addAppointment(
			address1.address,
			'Appointment with Professor Ortega',
			'Discussion about Final Project',
			1649505600,
			1649509200
		);
		await tx.wait();

		const tx2 = await contract['cancelAppointment(address,string)'](
			address1.address,
			'Appointment with Professor Ortega'
		);
		await tx2.wait();

		const appointments = await contract.getAppointments(address1.address);
		expect(appointments[0].attendee).to.equal(
			'0x0000000000000000000000000000000000000000'
		);
	});

	it('Should cancel an appointment from calender owner', async () => {
		const tx = await contract.addAppointment(
			owner.address,
			'Appointment with Professor Ortega',
			'Discussion about Final Project',
			1649505600,
			1649509200
		);
		await tx.wait();

		const tx2 = await contract['cancelAppointment(string,address)'](
			'Appointment with Professor Ortega',
			tx.from
		);
		await tx2.wait();

		const appointments = await contract.getAppointments(owner.address);
		expect(appointments[0].attendee).to.equal(
			'0x0000000000000000000000000000000000000000'
		);
	});
});
