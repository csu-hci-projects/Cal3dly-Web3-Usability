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

document.head.appendChild(
	Object.assign(document.createElement('link'), {
		rel: 'icon',
		href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🗓️</text></svg>",
	})
);

ReactDOM.render(
	<DAppProvider config={config}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</DAppProvider>,
	document.getElementById('root')
);
