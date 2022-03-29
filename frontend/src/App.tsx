import { useEffect, useState } from 'react';
import './App.css';
import { Alert, Button, Typography } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
	const [account, setAccount] = useState<String | undefined>(undefined);

	useEffect(() => {
		isConnected();
	}, []);

	const isConnected = async () => {
		const provider: any = await detectEthereumProvider();
		if (provider.selectedAddress) {
			setAccount(provider.selectedAddress);
		} else {
			setAccount(undefined);
		}
	};

	const connectUser = async () => {
		try {
			const provider: any = await detectEthereumProvider();
			const accounts = await provider.request({
				method: 'eth_requestAccounts',
			});

			if (accounts.length) {
				console.log('FOUND ACCOUNT', accounts[0]);
				setAccount(accounts[0]);
			} else {
				return <Alert severity='error'>No accounts found</Alert>;
			}
		} catch (e) {
			console.log(e);
		}
	};

	const disconnectUser = async () => {};

	return (
		<div className='App'>
			<header className='App-header'>
				<Typography variant='h1'>Cal3dly</Typography>
				<Typography className='subtitle' variant='subtitle1'>
					A Web3 Powered Appointment Scheduler
				</Typography>
			</header>
			{!account && (
				<Button variant='outlined' onClick={connectUser}>
					Connect Wallet
				</Button>
			)}
			{account && <div>Rest of App</div>}
		</div>
	);
}

export default App;
