import React, { FC } from 'react';
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
	const { activateBrowserWallet, account, deactivate } = useEthers();
	const balance = useEtherBalance(account);
	const ens = useLookupAddress();
	return (
		<>
			{account ? (
				<Box
					display='flex'
					alignItems='center'
					background='gray.700'
					borderRadius='xl'
					py='0'
				>
					<Box px='3'>
						<Text color='white' fontSize='md'>
							{balance && parseFloat(formatEther(balance)).toFixed(3)} ETH
						</Text>
					</Box>
					<Button
						onClick={props.onOpen}
						bg='gray.800'
						border='1px solid transparent'
						_hover={{
							border: '1px',
							borderStyle: 'solid',
							borderColor: 'blue.400',
							backgroundColor: 'gray.700',
						}}
						borderRadius='xl'
						m='1px'
						px={3}
						height='38px'
					>
						<Text color='white' fontSize='md' fontWeight='medium' mr='2'>
							{ens ?? shortenAddress(account)}
						</Text>
						<Identicon />
					</Button>
				</Box>
			) : (
				<Button onClick={() => activateBrowserWallet()}>Connect Wallet</Button>
			)}
		</>
	);
};
