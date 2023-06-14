'use client';

import { BsShieldShaded, BsShieldFill, BsTrophy, BsTrophyFill, BsPerson, BsPersonFill } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import Links from './NavLinks/Links';

export default function NavLinks() {
	const pathName = usePathname().split('/')[1];

	return (
		<ul className='fixed left-1/2 flex -translate-x-1/2 max-sm:bottom-8 max-sm:w-5/6 max-sm:justify-between max-sm:rounded-full max-sm:border max-sm:border-black max-sm:bg-white max-sm:p-4 max-sm:px-8 dark:max-sm:border-white dark:max-sm:bg-black sm:absolute sm:gap-4'>
			<li className='max-md:hidden'>
				<Links href='/' pathname={pathName} title='Início' />
			</li>
			<li>
				<Links
					href='/times'
					pathname={pathName}
					title='Times'
					FillIcon={BsShieldFill}
					OutlineIcon={BsShieldShaded}
				/>
			</li>
			<li>
				<Links
					href='/partidas'
					pathname={pathName}
					title='Partidas'
					FillIcon={BsTrophyFill}
					OutlineIcon={BsTrophy}
				/>
			</li>
			<li>
				<Links
					href='/jogadores'
					pathname={pathName}
					title='Jogadores'
					FillIcon={BsPersonFill}
					OutlineIcon={BsPerson}
				/>
			</li>
		</ul>
	);
}
