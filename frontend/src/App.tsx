import { useEffect, useState } from 'react';
import './styles/App.css';
import { useEthers } from '@usedapp/core';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import { ChakraProvider } from '@chakra-ui/provider';
import { setQueryString } from './services/queryString';
import { Address } from './types';
function App() {
	const { account } = useEthers();
	const [owner, setOwner] = useState<Address>();

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const owner = queryParams.get('owner');
		setOwner(owner);
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
