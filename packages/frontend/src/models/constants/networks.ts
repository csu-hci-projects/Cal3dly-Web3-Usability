import { TNetworkInfo } from 'eth-hooks/models';
import { INFURA_ID } from './constants';

export type TNetworkNames = 'localhost' | 'mainnet' | 'rinkeby' | 'ropsten';

export const NETWORKS: Record<TNetworkNames, TNetworkInfo> = {
	localhost: {
		name: 'localhost',
		color: '#666666',
		chainId: 31337,
		blockExplorer: '',
		rpcUrl: 'http://' + window.location.hostname + ':8545',
	},
	mainnet: {
		name: 'mainnet',
		color: '#ff8b9e',
		chainId: 1,
		rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
		blockExplorer: 'https://etherscan.io/',
	},
	rinkeby: {
		name: 'rinkeby',
		color: '#e0d068',
		chainId: 4,
		rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
		faucet: 'https://faucet.rinkeby.io/',
		blockExplorer: 'https://rinkeby.etherscan.io/',
	},
	ropsten: {
		name: 'ropsten',
		color: '#F60D09',
		chainId: 3,
		faucet: 'https://faucet.ropsten.be/',
		blockExplorer: 'https://ropsten.etherscan.io/',
		rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
	},
};
