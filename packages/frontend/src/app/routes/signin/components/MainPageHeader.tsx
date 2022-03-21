import { getNetwork } from '@ethersproject/networks';
import { Button, Alert } from '@mantine/core';
import React, { FC, ReactElement } from 'react';
import { AppProviders } from '~~/app/routes/main/hooks/useAppProviders';
import { useEthersContext } from 'eth-hooks/context';
import { TEthersModalConnector } from 'eth-hooks/context';
import { useGasPrice } from 'eth-hooks';

// displays a page header
export interface IMainPageHeaderProps {
	appProviders: AppProviders;
}

/**
 * ✏ Header: Edit the header and change the title to your project name.  Your account is on the right *
 * @param props
 * @returns
 */
export const MainPageHeader: FC<IMainPageHeaderProps> = (props) => {
	const ethersContext = useEthersContext();
	const selectedChainId = ethersContext.chainId;

	// 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation
	// const gasPrice = useGasPrice(ethersContext.chainId, 'fast', getNetworkInfo(ethersContext.chainId));

	/**
	 * this shows the page header and other informaiton
	 */
	const left = (
		<>
			<div>
				<span>Tokenized Learning</span>
			</div>
			{props.children}
		</>
	);

	/**
	 * https://github.com/scaffold-eth/scaffold-eth/blob/master/packages/react-app/src/components/Account.jsx
	 * https://youtu.be/aYMj00JoIug
	 */

	const connector = props.appProviders.createLoginConnector();

	// const right = (
	//   <div style={{ position: 'fixed', textAlign: 'right', right: 0, top: 0, padding: 10 }}>
	//     <Account
	//       createLoginConnector={props.scaffoldAppProviders.createLoginConnector}
	//       ensProvider={props.scaffoldAppProviders.mainnetProvider}
	//       price={props.price}
	//       blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
	//       hasContextConnect={true}
	//     />

	//   </div>
	// );

	/**
	 * display the current network on the top left
	 */
	let networkDisplay: ReactElement | undefined;
	if (
		selectedChainId &&
		selectedChainId != props.appProviders.targetNetwork.chainId
	) {
		const description = (
			<div>
				You have <b>{getNetwork(selectedChainId)?.name}</b> selected and you
				need to be on{' '}
				<b>{getNetwork(props.appProviders.targetNetwork)?.name ?? 'UNKNOWN'}</b>
				.
			</div>
		);
		networkDisplay = (
			<div
				style={{
					zIndex: 2,
					position: 'absolute',
					right: 0,
					top: 60,
					padding: 16,
				}}
			>
				{/* <Alert message="⚠️ Wrong Network" description={description} type="error" closable={false} /> */}
			</div>
		);
	} else {
		networkDisplay = (
			<div
				style={{
					position: 'absolute',
					right: 18,
					top: 54,
					padding: 10,
					color: props.appProviders.targetNetwork.color,
				}}
			>
				{props.appProviders.targetNetwork.name}
			</div>
		);
	}

	return (
		<>
			{/* {left} */}
			{/* {networkDisplay}
      {right} */}
			<Button
				variant='filled'
				onClick={() =>
					connector !== undefined
						? ethersContext.openModal(connector)
						: console.log('Null')
				}
			>
				CONNECT
			</Button>
		</>
	);
};
