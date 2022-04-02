import { FC } from 'react';
import { Heading, useDisclosure } from '@chakra-ui/react';
import { Web3Button } from './Web3Button';
import AccountModal from './AccountModal';
import useWindowSize from '../../hooks/useWindowSize';

export const Header: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const size = useWindowSize();
	return (
		<div className='header'>
			<div className='header-contents'>
				<Heading letterSpacing='wide' color='#fff'>
					🗓️ {size.width > 450 && 'Cal3dly'}
				</Heading>
				<Web3Button onOpen={onOpen} />
				<AccountModal isOpen={isOpen} onClose={onClose} />
			</div>
		</div>
	);
};
