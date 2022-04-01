import React, { FC } from 'react';
import { Heading, useDisclosure } from '@chakra-ui/react';
import { Web3Button } from './Web3Button';
import AccountModal from './AccountModal';

export const Header: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div className='header'>
			<div className='header-contents'>
				<Heading letterSpacing='wide' color='#fff'>
					🗓️ Cal3dly
				</Heading>
				<Web3Button onOpen={onOpen} />
				<AccountModal isOpen={isOpen} onClose={onClose} />
			</div>
		</div>
	);
};
