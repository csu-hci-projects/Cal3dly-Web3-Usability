import { useEffect } from 'react';
import './styles/App.css';
import { Alert } from '@mui/material';
import { useEthers } from '@usedapp/core';
import {} from 'query-string';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';

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

	useEffect(() => {
		// if (account?.length) {
		// 	const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?account=' + account;
		// }
	}, [account]);

	return (
		<>
			<Header />
			<Main />
		</>
	);
}

export default App;
