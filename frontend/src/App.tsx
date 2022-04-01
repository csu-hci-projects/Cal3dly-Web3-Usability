import { useEffect } from 'react';
import './styles/App.css';
import { useEthers } from '@usedapp/core';
import {} from 'query-string';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import { ChakraProvider } from '@chakra-ui/provider';

function App() {
	const { account } = useEthers();

	useEffect(() => {
		// if (account?.length) {
		// 	const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?account=' + account;
		// }
	}, [account]);

	return (
		<ChakraProvider>
			<Header />
			<Main />
		</ChakraProvider>
	);
}

export default App;
