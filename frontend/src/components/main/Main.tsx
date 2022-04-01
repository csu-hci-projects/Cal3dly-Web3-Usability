import React, { FC } from 'react';
import { Calendar } from './Calender';
import { useEthers } from '@usedapp/core';
import { Text } from '@chakra-ui/react';

export const Main: FC = () => {
	const { account } = useEthers();
	return (
		<div className='main-content-area'>
			<div>
				<Text fontSize='50px'>Cal3dly</Text>
				<Text fontSize='md'>A Web3 Powered Appointment Scheduler</Text>
			</div>
			{account && <Calendar />}
		</div>
	);
};
