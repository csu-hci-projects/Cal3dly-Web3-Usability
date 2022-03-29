import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';

describe('Cal3dly', () => {
	let Contract, contract: any;
	let owner, address1, address2;

	beforeEach(async () => {
		[owner, address1, address2] = await ethers.getSigners();
		Contract = await ethers.getContractFactory('Cal3dly');
		contract = await Contract.deploy();
		await contract.deployed();
	});

	it('Should add two appointments', async () => {
		const tx = await contract.addAppointment(
			'Appointment with Professor Ortega',
			'Discussion about Final Project',
			1649505600,
			1649509200
		);
		await tx.wait();

		const tx2 = await contract.addAppointment(
			'Test Appointment',
			'Test Description',
			1653292800,
			1653294600
		);
		await tx2.wait();

		const appointments = await contract.getAppointments();

		expect(appointments.length).to.equal(2);
	});
});
