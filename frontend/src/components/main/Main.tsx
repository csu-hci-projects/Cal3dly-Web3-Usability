import { FC } from 'react';
import { Calendar } from './Calender';
import { useEthers } from '@usedapp/core';
import { Center, Text } from '@chakra-ui/react';

interface Props {
	owner: string | null | undefined;
}

export const Main: FC<Props> = ({ owner }) => {
	const { account } = useEthers();
	return (
		<div className='main-content-area'>
			<Center>
				{!account && (
					<div>
						<Text fontSize='50px'>Cal3dly</Text>
						<Text fontSize='md'>A Web3 Powered Appointment Scheduler</Text>
					</div>
				)}
				{account && <Calendar owner={owner} />}
			</Center>
		</div>
	);
};
