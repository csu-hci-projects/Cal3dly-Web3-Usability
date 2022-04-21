import { FC } from 'react';
import { Calendar } from './calendar/Calender';
import { useEthers } from '@usedapp/core';
import { Address } from '../../types';
import { Info } from './Info';

interface Props {
	owner: Address;
}

export const Main: FC<Props> = ({ owner }) => {
	const { account } = useEthers();
	return (
		<div className='main-content-area'>
			{!account && !owner && <Info />}
			{(account || owner) && <Calendar owner={owner} />}
		</div>
	);
};
