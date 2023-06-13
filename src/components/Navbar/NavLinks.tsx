'use client';

import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Links from './NavLinks/Links';

export default function NavLinks() {
	const pathName = usePathname().split('/')[1];

	return (
		<ul className='absolute left-1/2 flex -translate-x-1/2 gap-4'>
			<li>
				<Links href='/' pathname={pathName} title='Início' />
			</li>
			<li>
				<Links href='/times' pathname={pathName} title='Times' />
			</li>
			<li>
				<Links href='/partidas' pathname={pathName} title='Partidas' />
			</li>
			<li>
				<Links href='/jogadores' pathname={pathName} title='Jogadores' />
			</li>
		</ul>
	);
}
