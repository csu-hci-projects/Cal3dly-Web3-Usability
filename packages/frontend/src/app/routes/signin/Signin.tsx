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

import { MainPageHeader } from './components';
import { useAppProviders } from '~~/app/routes/signin/hooks/useAppProviders';
import { useEthersContext } from 'eth-hooks/context';
import { useAppContracts } from '~~/app/routes/signin/hooks/useAppContracts';
import { ThemeSwitcher } from '~~/app/common';
import { Center, Container, Title } from '@mantine/core';

export const DEBUG = false;

export const Signin: FC = () => {
	const appProviders = useAppProviders();
	const ethersContext = useEthersContext();
	const appContractConfig = useAppContracts();

	return (
		<div className='main-content-area'>
			{/* <MainPageHeader appProviders={appProviders} /> */}

			<Center>
				<Title>Sign in to get Started</Title>
			</Center>
			<ThemeSwitcher />
		</div>
	);
};

export default Signin;
