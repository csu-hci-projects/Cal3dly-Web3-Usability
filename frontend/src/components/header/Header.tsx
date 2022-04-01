import React, { FC } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { Web3Button } from './Web3Button';
import AccountModal from './AccountModal';

export const Header: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div className='header'>
			<div className='header-contents'>
				<p>Cal3dly 🗓️</p>
				<Web3Button onOpen={onOpen} />
				<AccountModal isOpen={isOpen} onClose={onClose} />
			</div>
		</div>
	);
};
