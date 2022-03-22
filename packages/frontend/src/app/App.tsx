import React, { FC, lazy, Suspense } from 'react';
import { initializeApp } from 'firebase/app';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { ErrorBoundary, ErrorFallback } from '~~/app/common/ErrorFallback';
import { EthersAppContext } from 'eth-hooks/context';

const SigninPage = lazy(() => import('./routes/signin/Signin'));

import '~~/styles/css/tailwind-base.pcss';
import '~~/styles/css/tailwind-components.pcss';
import '~~/styles/css/tailwind-utilities.pcss';
import '~~/styles/css/app.css';

const savedTheme = window.localStorage.getItem('theme');

const themes = {
	dark: './dark-theme.css',
	light: './light-theme.css',
};

const firebaseConfig = {
	apiKey: 'AIzaSyBwihBOeIW1ZcH-wS1bdRX4Iw5sOgJlsns',
	authDomain: 'tokenized-learning.firebaseapp.com',
	projectId: 'tokenized-learning',
	storageBucket: 'tokenized-learning.appspot.com',
	messagingSenderId: '203176958395',
	appId: '1:203176958395:web:c25752f06cbfa0ac37cc9e',
	measurementId: 'G-FT9NEYX730',
};

const App: FC = () => {
	initializeApp(firebaseConfig);
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<EthersAppContext>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<ThemeSwitcherProvider
						themeMap={themes}
						defaultTheme={savedTheme || 'light'}
					>
						<Suspense fallback={<div />}>
							<SigninPage />
						</Suspense>
					</ThemeSwitcherProvider>
				</ErrorBoundary>
			</EthersAppContext>
		</ErrorBoundary>
	);
};

export default App;
