import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/utils';

interface SwitchDarkModeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isDarkMode: boolean;
}

export default function SwitchDarkMode({ className, onClick, isDarkMode, ...props }: SwitchDarkModeProps) {
	return (
		<button
			className={cn(
				'flex w-14 items-center justify-center rounded-full bg-black p-1 text-black',
				{ 'bg-white text-white': isDarkMode },
				className
			)}
			onClick={onClick}
			{...props}>
			<div
				className={cn('-translate-x-1/2 rounded-full bg-white p-1 transition', {
					'translate-x-1/2 bg-black': isDarkMode,
				})}>
				{isDarkMode ? <BsFillMoonFill size={15} /> : <BsSunFill size={15} />}
			</div>
		</button>
	);
}
