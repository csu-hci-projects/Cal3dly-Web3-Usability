import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { DAppProvider, Config, Goerli } from '@usedapp/core';

const config: Config = {
	readOnlyChainId: Goerli.chainId,
	readOnlyUrls: {
		[Goerli.chainId]:
			'https://eth-goerli.alchemyapi.io/v2/RdBZNnx__NRbCfoTa2CirDNVomyZPQP6',
	},
};

ReactDOM.render(
	<DAppProvider config={config}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</DAppProvider>,
	document.getElementById('root')
);
