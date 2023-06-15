'use client';

import NavLinks from './Navbar/NavLinks';
import { isDarkModeContext } from '@/utils/context';
import SwitchDarkMode from './Navbar/SwitchDarkMode';
import { Dispatch, SetStateAction, useContext } from 'react';
import NavTitle from './Navbar/NavTitle';
import Login from './Navbar/Login';
import { Session } from '@supabase/supabase-js';
import { BsGear, BsFillGearFill } from 'react-icons/bs';
import { useState } from 'react';
import { cn } from '@/utils/utils';

export default function Navbar({
	setIsDarkMode,
	setSession,
}: {
	setIsDarkMode: Dispatch<SetStateAction<boolean>>;
	setSession: Dispatch<SetStateAction<Session | null>>;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const isDarkMode = useContext(isDarkModeContext);

	return (
		<div className='fixed z-40 flex w-full items-center justify-between bg-white px-2 py-2 dark:bg-black sm:px-8'>
			<NavTitle />

			<NavLinks />

			<div className='left-80 flex items-center gap-4 max-sm:absolute'>
				<SwitchDarkMode
					onClick={() => {
						setIsDarkMode((value) => !value);
					}}
					isDarkMode={isDarkMode}
					className={cn('transition max-sm:absolute max-sm:right-16 max-sm:translate-x-[340%]', {
						'z-40 max-sm:translate-x-0': isOpen,
					})}
				/>
				<div
					className={cn(
						'absolute -top-4 right-0 z-30 h-screen w-[200px] translate-x-[120%] border-l border-black bg-black/30 backdrop-blur-sm transition dark:border-white dark:bg-black/50 sm:hidden',
						{
							'max-sm:translate-x-0': isOpen,
						}
					)}
				/>
				<Login setSession={setSession} isOpen={isOpen} />
				<div
					className={cn('ml-4 rotate-0 transition duration-300 sm:hidden', {
						'z-50 rotate-180': isOpen,
					})}
					onClick={() => setIsOpen((data) => !data)}>
					{isOpen ? <BsFillGearFill size={25} /> : <BsGear size={25} />}
				</div>
			</div>

			<div className='absolute bottom-0 left-0 h-px w-full bg-gradient-radial from-black to-75% dark:from-white' />
		</div>
	);
}
