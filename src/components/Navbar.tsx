import NavLinks from './Navbar/NavLinks';
import { isDarkModeContext } from '@/utils/context';
import SwitchDarkMode from './Navbar/SwitchDarkMode';
import { Dispatch, SetStateAction, useContext } from 'react';
import NavTitle from './Navbar/NavTitle';
import Login from './Navbar/Login';
import { Session } from '@supabase/supabase-js';

export default function Navbar({
	setIsDarkMode,
	setSession,
}: {
	setIsDarkMode: Dispatch<SetStateAction<boolean>>;
	setSession: Dispatch<SetStateAction<Session | null>>;
}) {
	const isDarkMode = useContext(isDarkModeContext);

	return (
		<div className='relative flex items-center justify-between px-8 py-2'>
			<NavTitle />

			<NavLinks />

			<div className='flex items-center gap-4'>
				<SwitchDarkMode
					onClick={() => {
						setIsDarkMode((value) => !value);
					}}
					isDarkMode={isDarkMode}
				/>
				<Login setSession={setSession} />
			</div>
			<div className='absolute bottom-0 left-0 h-px w-full bg-gradient-radial from-black to-75% dark:from-white' />
		</div>
	);
}
