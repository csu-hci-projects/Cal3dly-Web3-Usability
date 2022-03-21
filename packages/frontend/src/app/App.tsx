import React, { FC, lazy, Suspense } from 'react';
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

const App: FC = () => {
	console.log('loading app...');
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
