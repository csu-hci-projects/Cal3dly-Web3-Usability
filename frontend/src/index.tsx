import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { DAppProvider, Config, Goerli } from '@usedapp/core';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from './styles/theme';

const config: Config = {
	readOnlyChainId: Goerli.chainId,
	readOnlyUrls: {
		[Goerli.chainId]:
			'https://eth-goerli.alchemyapi.io/v2/AxnmGEYn7VDkC4KqfNSFbSW9pHFR7PDO',
	},
};

document.head.appendChild(
	Object.assign(document.createElement('link'), {
		rel: 'icon',
		href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🗓️</text></svg>",
	})
);

ReactDOM.render(
	<StrictMode>
		<DAppProvider config={config}>
			<App />
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		</DAppProvider>
	</StrictMode>,
	document.getElementById('root')
);
