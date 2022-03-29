import { useEffect, useState } from 'react';
import './App.css';
import { Alert, Button, Typography } from '@mui/material';
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core';
import { Calendar } from './components/Calender';

function App() {
	const { activateBrowserWallet, account, error, active, library, deactivate } =
		useEthers();
	let listener = null;
	const ens = useLookupAddress();
	useEffect((): any => {
		const wasConnected = localStorage.getItem('IS_CONNECTED');
		if (!active && !account && !error && wasConnected) {
			activateBrowserWallet();
			return;
		}

		if (!active && !account && !error && !wasConnected) {
			localStorage.setItem('IS_CONNECTED', 'false');
			return;
		}

		if (active && account && wasConnected === 'false') {
			localStorage.setItem('IS_CONNECTED', 'true');
			return;
		}

		if (error) {
			return <Alert severity='error'>{error.message}</Alert>;
		}
	}, [active, error]);

	useEffect(() => {
		// @ts-expect-error
		listener = library?.provider?.on(
			'accountsChanged',
			(acc: string | null | undefined) => {
				if (acc && !acc.length) {
					localStorage.setItem('IS_CONNECTED', 'false');
				}
			}
		);
	}, [library]);

	return (
		<div className='App'>
			<header>
				<Typography variant='h1'>Cal3dly</Typography>
				<Typography className='subtitle' variant='subtitle1'>
					A Web3 Powered Appointment Scheduler
				</Typography>
			</header>
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
			{account && <Calendar />}
		</div>
	);
}

export default App;
