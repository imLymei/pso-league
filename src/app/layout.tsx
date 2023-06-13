'use client';

import { cn } from '@/utils/utils';
import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { isDarkModeContext } from '@/utils/context';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState(true);

	function updateLocalStorage() {
		localStorage.setItem('pso-darkmode', isDarkMode ? 'dark' : 'light');
	}

	useEffect(() => {
		const localStorageDarkMode = localStorage.getItem('pso-darkmode');

		if (localStorageDarkMode) {
			setIsDarkMode(localStorageDarkMode == 'dark' ? true : false);
		} else {
			updateLocalStorage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		updateLocalStorage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDarkMode]);

	return (
		<html lang='en'>
			<head>
				<title>Tabela de Times PSO</title>
				<meta name='description' content='Um site para tabelas de PSO'></meta>
			</head>
			<body className={cn(`min-h-screen ${inter.className}`, { 'dark bg-black text-white': isDarkMode })}>
				<isDarkModeContext.Provider value={isDarkMode}>
					<Navbar setIsDarkMode={setIsDarkMode} />
					{children}
				</isDarkModeContext.Provider>
			</body>
		</html>
	);
}
