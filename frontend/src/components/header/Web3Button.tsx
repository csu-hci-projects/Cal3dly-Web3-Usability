import { FC } from 'react';
import {
	useEthers,
	shortenAddress,
	useLookupAddress,
	useEtherBalance,
} from '@usedapp/core';
import { Button, Box, Text, IconButton, Flex, Tooltip } from '@chakra-ui/react';
import { FaHouseUser } from 'react-icons/fa';
import { formatEther } from '@ethersproject/units';
import Identicon from './Identicon';
import { Address } from '../../types';
import { setQueryString } from '../../services/queryString';

interface Props {
	onOpen: () => void;
	setOwner: React.Dispatch<React.SetStateAction<Address>>;
	owner: Address;
}

export const Web3Button: FC<Props> = ({ onOpen, setOwner, owner }) => {
	const { activateBrowserWallet, account } = useEthers();
	const balance = useEtherBalance(account);
	const ens = useLookupAddress();
	return (
		<Flex>
			{account ? (
				<Box
					display='flex'
					alignItems='center'
					background='#F05F57'
					borderRadius='xl'
					py='0'
				>
					<Box px='3'>
						<Text fontSize='md'>
							{balance && parseFloat(formatEther(balance)).toFixed(4)} ETH
						</Text>
					</Box>
					<Button
						onClick={onOpen}
						bg='#A23B4D'
						color='white'
						border='1px solid transparent'
						_hover={{
							border: '1px',
							color: 'black',
							borderStyle: 'solid',
							borderColor: 'white',
							backgroundColor: '#F05F57',
						}}
						borderRadius='xl'
						m='1px'
						px={3}
						height='38px'
					>
						<Text fontSize='md' fontWeight='medium' mr='2'>
							{ens ?? shortenAddress(account)}
						</Text>
						<Identicon />
					</Button>
				</Box>
			) : (
				<Button
					bg='#93364A'
					color='white'
					border='1px solid transparent'
					boxShadow='dark-lg'
					_hover={{
						color: 'black',
						backgroundColor: '#F05F57',
					}}
					onClick={() => activateBrowserWallet()}
				>
					Connect Wallet
				</Button>
			)}
			{account && owner !== account && (
				<Tooltip
					hasArrow
					label='Go to your Cal3dly'
					bg='#8C314B'
					fontWeight='bold'
				>
					<IconButton
						aria-label='Go to your Cal3dly'
						ml='10px'
						borderRadius='3xl'
						display='inline-flex'
						variant='unstyled'
						alignItems='center'
						justifyContent='center'
						bg='#A23B4D'
						color='white'
						_hover={{
							backgroundColor: '#F05F57',
						}}
						icon={<FaHouseUser size={30} />}
						onClick={() => showHomeCalender(setOwner, account)}
					/>
				</Tooltip>
			)}
		</Flex>
	);
};

function showHomeCalender(
	setOwner: React.Dispatch<React.SetStateAction<Address>>,
	account: Address
) {
	setOwner(account);
	setQueryString('owner', account ?? '');
}
