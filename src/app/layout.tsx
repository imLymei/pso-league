'use client';

import { cn, supabase } from '@/utils/utils';
import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { isDarkModeContext, sessionContext } from '@/utils/context';
import Navbar from '@/components/Navbar';
import { Session } from '@supabase/supabase-js';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [session, setSession] = useState<Session | null>(null);

	function updateLocalStorage() {
		localStorage.setItem('pso-darkmode', isDarkMode ? 'dark' : 'light');
	}

	useEffect(() => {
		const localStorageDarkMode = localStorage.getItem('pso-darkmode');
		const localStorageSession = localStorage.getItem('pso-session');

		if (localStorageDarkMode) {
			setIsDarkMode(localStorageDarkMode == 'dark' ? true : false);
		} else {
			updateLocalStorage();
		}

		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

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
					<sessionContext.Provider value={session}>
						<Navbar setIsDarkMode={setIsDarkMode} setSession={setSession} />
						{children}
					</sessionContext.Provider>
				</isDarkModeContext.Provider>
			</body>
		</html>
	);
}
