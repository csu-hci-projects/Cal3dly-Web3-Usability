import Web3Modal, { ICoreOptions } from 'web3modal';
import { INFURA_ID } from '~~/models/constants/constants';
import { localNetworkInfo } from '~~/config/providersConfig';

export const getWeb3ModalConfig = async (): Promise<Partial<ICoreOptions>> => {
  const { WalletLink } = await import('walletlink');
  const WalletConnectProvider = (await import('@walletconnect/ethereum-provider')).default;
  const { ConnectToStaticJsonRpcProvider } = await import('eth-hooks/context');
  const { StaticJsonRpcProvider } = await import('@ethersproject/providers');

  // Coinbase walletLink init
  const walletLink = new WalletLink({
    appName: 'coinbase',
  });

  // WalletLink provider
  const walletLinkProvider = walletLink.makeWeb3Provider(`https://mainnet.infura.io/v3/${INFURA_ID}`, 1);

  const coinbaseWalletLink = {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to your Coinbase Wallet (not coinbase.com)',
    },
    package: walletLinkProvider,
    connector: async (provider: any, _options: any) => {
      await provider.enable();
      return provider;
    },
  };

  //network: 'mainnet', // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
  const walletConnectEthereum = {
    package: WalletConnectProvider,
    options: {
      bridge: 'https://polygon.bridge.walletconnect.org',
      infuraId: INFURA_ID,
      rpc: {
        1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
        42: `https://kovan.infura.io/v3/${INFURA_ID}`,
        100: 'https://dai.poa.network',
      },
    },
  };

  const localhostStaticConnector = {
    display: {
      logo: 'https://avatars.githubusercontent.com/u/56928858?s=200&v=4',
      name: 'BurnerWallet',
      description: '🔥 Connect to localhost with a burner wallet 🔥',
    },
    package: StaticJsonRpcProvider,
    connector: ConnectToStaticJsonRpcProvider,
    options: {
      chainId: localNetworkInfo.chainId,
      rpc: {
        [localNetworkInfo.chainId]: localNetworkInfo.rpcUrl,
      },
    },
  };

  return {
    cacheProvider: true,
    theme: 'light',
    providerOptions: {
      'custom-localhost': localhostStaticConnector,
      walletconnect: walletConnectEthereum,
      'custom-walletlink': coinbaseWalletLink,
    },
  };
};
