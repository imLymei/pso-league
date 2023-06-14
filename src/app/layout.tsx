'use client';

import { cn, supabase } from '@/utils/utils';
import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { isDarkModeContext, sessionContext, playerContext } from '@/utils/context';
import Navbar from '@/components/Navbar';
import { Session } from '@supabase/supabase-js';
import PlayerDetails from '@/components/PlayerDetails';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [session, setSession] = useState<Session | null>(null);
	const [choseName, setChoseName] = useState(false);
	const [choosingName, setChoosingName] = useState(false);
	const [player, setPlayer] = useState<player | null>(null);

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

	useEffect(() => {
		if (session) {
			supabase
				.from('players')
				.select('*')
				.eq('email', session.user.email)
				.then(({ data: players, error }) => {
					if (players?.length == 0 && !choseName) {
						setChoosingName(true);
						setPlayer(null);
					} else {
						//@ts-ignore
						setPlayer(players[0]);
					}
				});
		}
	}, [choseName, session]);

	return (
		<html lang='en'>
			<head>
				<title>Tabela de Times PSO</title>
				<meta name='description' content='Um site para tabelas de PSO'></meta>
			</head>
			<body
				className={cn(`min-h-screen ${inter.className}`, {
					'dark bg-black text-white': isDarkMode,
				})}>
				<isDarkModeContext.Provider value={isDarkMode}>
					<sessionContext.Provider value={session}>
						<playerContext.Provider value={player}>
							<Navbar setIsDarkMode={setIsDarkMode} setSession={setSession} />
							{children}
							{choosingName && <PlayerDetails setPlayer={setPlayer} setChoosingName={setChoosingName} />}
						</playerContext.Provider>
					</sessionContext.Provider>
				</isDarkModeContext.Provider>
			</body>
		</html>
	);
}
