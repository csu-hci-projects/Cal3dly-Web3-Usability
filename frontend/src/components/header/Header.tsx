import { FC, useEffect, useState } from 'react';
import { Heading, useDisclosure, Flex } from '@chakra-ui/react';
import { Web3Button } from './Web3Button';
import AccountModal from './AccountModal';
import useWindowSize from '../../hooks/useWindowSize';
import { Address } from '../../types';
import { shortenAddress, useEthers } from '@usedapp/core';

interface Props {
	owner: Address;
	setOwner: React.Dispatch<React.SetStateAction<Address>>;
}

export const Header: FC<Props> = ({ owner, setOwner }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { account } = useEthers();
	const [name, setName] = useState(getName(owner, account));
	const size = useWindowSize();
	useEffect(() => {
		setName(getName(owner, account));
	}, [account, owner]);
	return (
		<div className='header'>
			<Flex
				p='12px'
				m='0, auto'
				justifyContent='space-between'
				alignItems='center'
			>
				<Heading letterSpacing='wide' color='#fff' display='block'>
					🗓️{' '}
					{size.width > 860
						? `${name} Cal3dly`
						: size.width > 500
						? 'Cal3dly'
						: ''}
				</Heading>
				<Web3Button onOpen={onOpen} setOwner={setOwner} owner={owner} />
				<AccountModal isOpen={isOpen} onClose={onClose} setOwner={setOwner} />
			</Flex>
		</div>
	);
};

function getName(owner: Address, account: Address) {
	if (owner && owner === account) {
		return 'Your';
	} else if (owner && owner !== account) {
		return `${shortenAddress(owner)}'s`;
	}
	return '';
}
