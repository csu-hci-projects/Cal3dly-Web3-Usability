import { useEffect } from 'react';
import './styles/App.css';
import { Alert, Typography } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { Calendar } from './components/Calender';
import { Web3Button } from './components/Web3Button';

function App() {
	const { activateBrowserWallet, account, error, active, library } =
		useEthers();
	let listener = null;

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
			<Web3Button />
			{account && <Calendar />}
		</div>
	);
}

export default App;
