import { useState, useEffect } from 'react';

export default function useWindowSize() {
	const isSSR = typeof window === 'undefined';
	const [windowSize, setWindowSize] = useState({
		width: isSSR ? 1024 : window.innerWidth,
		height: isSSR ? 768 : window.innerHeight,
	});
	function changeSize() {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}
	useEffect(() => {
		window.addEventListener('resize', changeSize);
		return () => window.removeEventListener('resize', changeSize);
	}, []);
	return windowSize;
}
