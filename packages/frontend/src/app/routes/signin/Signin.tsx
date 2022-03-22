import React, {
	FC,
	ReactElement,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

import '~~/styles/signin-page.css';

import { ethers } from 'ethers';

import { useAppProviders } from '~~/app/routes/signin/hooks/useAppProviders';
import { useEthersContext } from 'eth-hooks/context';
// import { useAppContracts } from '~~/app/routes/signin/hooks/useAppContracts';
import { ThemeSwitcher } from '~~/app/common/ThemeSwitcher';
import { Center, Container, Title, Button } from '@mantine/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const DEBUG = false;

export const Signin: FC = () => {
	const appProviders = useAppProviders();
	const ethersContext = useEthersContext();
	// const appContractConfig = useAppContracts();
	const connector = appProviders.createLoginConnector();
	const db = getFirestore();

	useEffect(() => {
		const colRef = collection(db, 'books');

		getDocs(colRef).then((snapShot) => {
			let books = [];
			snapShot.docs.forEach((doc) => {
				books.push({
					...doc.data(),
					id: doc.id,
				});
			});
			console.log(books);
		});
	}, []);

	useEffect(() => {
		const getSigner = async () => {
			console.log(ethersContext.account);
			if (ethersContext.signer) {
				console.log('YESSS ' + (await ethersContext.signer.getAddress()));
			}
		};
		getSigner();
	}, [ethersContext.account]);

	return (
		<div className='main-content-area'>
			<Container>
				<Center>
					<Title>Sign in to get Started</Title>
				</Center>
				<br />
				{!ethersContext.signer ? (
					<Button
						onClick={() =>
							connector !== undefined
								? ethersContext.openModal(connector)
								: console.log('Null')
						}
					>
						CONNECT
					</Button>
				) : (
					<Button
						onClick={() =>
							connector !== undefined
								? ethersContext.disconnectModal()
								: console.log('Null')
						}
					>
						DISCONNECT
					</Button>
				)}
			</Container>

			<ThemeSwitcher />
		</div>
	);
};

export default Signin;
