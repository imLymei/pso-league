import { useEffect, useState } from 'react';

interface WindowSize {
	width: undefined | number;
	height: undefined | number;
}

export default function UseWindowSize() {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return windowSize;
}
