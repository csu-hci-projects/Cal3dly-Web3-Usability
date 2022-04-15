import { useEffect, useState } from 'react';
import './styles/App.css';
import { shortenAddress, useEthers } from '@usedapp/core';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import { ChakraProvider } from '@chakra-ui/provider';
import { setQueryString } from './services/queryString';
import { Address } from './types';
import { useToast } from '@chakra-ui/react';
import { Toast } from './components/main/Toast';
import { FaInfoCircle } from 'react-icons/fa';
function App() {
	const { account } = useEthers();
	const [owner, setOwner] = useState<Address>();
	const toast = useToast();
	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const owner = queryParams.get('owner');
		setOwner(owner);

		if (owner && !account) {
			toast({
				duration: 7500,
				render: () => (
					<Toast
						title={`${shortenAddress(
							owner
						)} has invited you to schedule a meeting!`}
						mode={'info'}
						info={'Connect your wallet to schedule your appointment.'}
						link={''}
						icon={FaInfoCircle}
					/>
				),
			});
		}
	}, []);

	useEffect(() => {
		if (!owner && account?.length) {
			setOwner(account);
			setQueryString('owner', account);
		}
	}, [account]);

	return (
		<ChakraProvider>
			<Header owner={owner} setOwner={setOwner} />
			<Main owner={owner} />
		</ChakraProvider>
	);
}

export default App;
