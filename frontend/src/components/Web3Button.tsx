import React, { FC } from 'react';
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core';
import { Button } from '@mui/material';

export const Web3Button: FC = () => {
	const { activateBrowserWallet, account, deactivate } = useEthers();
	const ens = useLookupAddress();
	return (
		<>
			{account ? (
				<>
					<Button variant='outlined'>{ens ?? shortenAddress(account)}</Button>
					<Button variant='outlined' onClick={() => deactivate()}>
						Disconnect
					</Button>
				</>
			) : (
				<Button variant='outlined' onClick={() => activateBrowserWallet()}>
					Connect
				</Button>
			)}
		</>
	);
};