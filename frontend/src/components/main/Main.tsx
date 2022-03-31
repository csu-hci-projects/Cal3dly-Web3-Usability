import React, { FC } from 'react';
import { Calendar } from './Calender';
import { Typography } from '@mui/material';
import { useEthers } from '@usedapp/core';

export const Main: FC = () => {
	const { account } = useEthers();
	return (
		<div className='main-content-area'>
			<div>
				<Typography variant='h1'>Cal3dly</Typography>
				<Typography className='subtitle' variant='subtitle1'>
					A Web3 Powered Appointment Scheduler
				</Typography>
			</div>
			{account && <Calendar />}
		</div>
	);
};
