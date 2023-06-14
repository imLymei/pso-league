import { cn } from '@/utils/utils';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

interface LinkProps {
	href: string;
	pathname: string;
	title: string;
	FillIcon?: IconType;
	OutlineIcon?: IconType;
}

export default function Links({ href, pathname, title, FillIcon, OutlineIcon }: LinkProps) {
	const condition = pathname == href.split('/')[1];

	return (
		<Link href={href} draggable={false}>
			{FillIcon && OutlineIcon ? (
				condition ? (
					<FillIcon className='sm:hidden' size={25} />
				) : (
					<OutlineIcon className='sm:hidden' size={25} />
				)
			) : null}
			<p className={cn('select-none transition max-sm:hidden', { 'scale-110': condition })}>{title}</p>
			<div
				className={cn(
					'h-1 w-full scale-0 rounded-full bg-black transition duration-300 dark:bg-white max-sm:translate-y-1 sm:h-px',
					{
						'scale-110': condition,
					}
				)}
			/>
		</Link>
	);
}
