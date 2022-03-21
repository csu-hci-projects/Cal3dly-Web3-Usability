/* eslint-disable */

const run = async (): Promise<void> => {
	// dynamic imports for code splitting
	const { lazy, Suspense, StrictMode } = await import('react');
	const ReactDOM = await import('react-dom');
	const App = lazy(() => import('./app/App'));

	ReactDOM.render(
		<StrictMode>
			<Suspense fallback={<div />}>
				<App />
			</Suspense>
		</StrictMode>,
		document.getElementById('root')
	);
};

void run();

export {};
