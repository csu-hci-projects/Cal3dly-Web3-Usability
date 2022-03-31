import React, { FC } from 'react';
import { Web3Button } from './Web3Button';

export const Header: FC = () => {
	return (
		<div className='header'>
			<div className='header-contents'>
				<p>Cal3dly 🗓️</p>
				<Web3Button />
			</div>
		</div>
	);
};
