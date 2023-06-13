import NavLinks from './Navbar/NavLinks';
import { isDarkModeContext } from '@/utils/context';
import SwitchDarkMode from './Navbar/SwitchDarkMode';
import { Dispatch, SetStateAction, useContext } from 'react';
import NavTitle from './Navbar/NavTitle';

export default function Navbar({ setIsDarkMode }: { setIsDarkMode: Dispatch<SetStateAction<boolean>> }) {
	const isDarkMode = useContext(isDarkModeContext);

	return (
		<div className='relative flex items-center justify-between p-2'>
			<NavTitle />

			<NavLinks />

			<SwitchDarkMode
				onClick={() => {
					setIsDarkMode((value) => !value);
				}}
				isDarkMode={isDarkMode}
			/>
			<div className='absolute bottom-0 left-0 h-px w-full bg-gradient-radial from-black to-75% dark:from-white' />
		</div>
	);
}
