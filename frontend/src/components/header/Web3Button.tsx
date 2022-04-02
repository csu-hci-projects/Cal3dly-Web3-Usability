import { FC } from 'react';
import {
	useEthers,
	shortenAddress,
	useLookupAddress,
	useEtherBalance,
} from '@usedapp/core';
import { Button, Box, Text } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import Identicon from './Identicon';

export const Web3Button: FC<any> = (props) => {
	const { activateBrowserWallet, account } = useEthers();
	const balance = useEtherBalance(account);
	const ens = useLookupAddress();
	return (
		<>
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
							{balance && parseFloat(formatEther(balance)).toFixed(3)} ETH
						</Text>
					</Box>
					<Button
						onClick={props.onOpen}
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
		</>
	);
};
