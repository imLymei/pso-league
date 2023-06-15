import { useEffect, useState } from 'react';

interface MousePosition {
	x: undefined | number;
	y: undefined | number;
}

export default function useMouse() {
	const [mousePosition, setMousePosition] = useState<MousePosition>({ x: undefined, y: undefined });

	useEffect(() => {
		function handleMouseMove(event: MouseEvent) {
			setMousePosition({ x: event.x, y: event.y });
		}

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return mousePosition;
}
